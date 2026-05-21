import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';
import { MongoClient, ChangeStream } from 'mongodb';
import { PromptTemplate } from '@langchain/core/prompts';
import { ConfigService } from '@nestjs/config';
import { Embeddings } from '@langchain/core/embeddings';

class GeminiEmbeddingsV1 extends Embeddings {
  private apiKey: string;
  private model: string;
  private readonly logger = new Logger('GeminiEmbeddings');

  constructor(apiKey: string, model = 'gemini-embedding-001') {
    super({});
    this.apiKey = apiKey;
    this.model = model;
  }

  async embedQuery(text: string, retries = 3): Promise<number[]> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:embedContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: `models/${this.model}`,
            content: { parts: [{ text }] },
          }),
        }
      );
      const data = await res.json();

      if (data.error?.code === 429) {
        this.logger.warn(`Quota exceeded. Retrying in 30s... (attempt ${attempt}/${retries})`);
        await this.sleep(30000);
        continue;
      }

      if (!data.embedding || !data.embedding.values) {
        throw new Error(`Embedding failed: ${JSON.stringify(data)}`);
      }

      return data.embedding.values;
    }

    throw new Error('Embedding failed after all retries');
  }

  async embedDocuments(texts: string[]): Promise<number[][]> {
    const results: number[][] = [];
    for (const text of texts) {
      const embedding = await this.embedQuery(text);
      results.push(embedding);
      await this.sleep(1000);
    }
    return results;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

@Injectable()
export class RagService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RagService.name);
  private embeddings: GeminiEmbeddingsV1;
  private llm: ChatGoogleGenerativeAI;
  private vectorStore: MongoDBAtlasVectorSearch | null = null;
  private client: MongoClient | null = null;
  private changeStream: ChangeStream | null = null;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) throw new Error('GEMINI_API_KEY is not defined in .env');

    this.embeddings = new GeminiEmbeddingsV1(apiKey, 'gemini-embedding-001');

    this.llm = new ChatGoogleGenerativeAI({
      model: 'gemini-2.0-flash-lite',
      temperature: 0.3,
      apiKey: apiKey,
      maxOutputTokens: 512,
    });
  }

  async onModuleInit() {
    await this.initVectorStore();
    await this.watchForChanges();
  }

  async onModuleDestroy() {
    if (this.changeStream) await this.changeStream.close();
    if (this.client) await this.client.close();
    this.logger.log('🔌 MongoDB connection closed');
  }

  private async initVectorStore() {
    const uri = this.configService.get<string>('MONGODB_URI');
    if (!uri) throw new Error('MONGODB_URI is not defined in .env');

    this.client = new MongoClient(uri);
    await this.client.connect();

    const db = this.client.db();
    const collection = db.collection('faqs');

    this.vectorStore = new MongoDBAtlasVectorSearch(this.embeddings, {
      collection: collection as any,
      indexName: 'vector_index',
      textKey: 'content',
      embeddingKey: 'embedding',
    });

    this.logger.log('✅ Vector Store Connected Successfully');
  }

  private async watchForChanges() {
    if (!this.client) return;

    const db = this.client.db();
    const collection = db.collection('faqs');

    this.changeStream = collection.watch([], { fullDocument: 'updateLookup' });
    this.logger.log('👀 Watching MongoDB for FAQ changes...');

    this.changeStream.on('change', async (change: any) => {
      try {
        const operationType = change.operationType;

        if (operationType === 'insert') {
          const doc = change.fullDocument;
          this.logger.log(`📝 New FAQ detected: ${doc.title || doc._id}`);
          await this.embedDocument(doc);

        } else if (operationType === 'update' || operationType === 'replace') {
          const doc = change.fullDocument;
          if (doc) {
            this.logger.log(`✏️ FAQ updated: ${doc.title || doc._id}`);
            await this.embedDocument(doc);
          }

        } else if (operationType === 'delete') {
          this.logger.log(`🗑️ FAQ deleted: ${change.documentKey._id}`);
        }
      } catch (err) {
        this.logger.error('❌ Error processing change stream event:', err);
      }
    });

    this.changeStream.on('error', (err) => {
      this.logger.error('❌ Change stream error:', err);
    });
  }

  private async embedDocument(doc: any) {
    if (!this.client) return;

    const text = doc.content ||
      `${doc.title || ''} ${doc.question || ''} ${doc.answer || ''}`.trim();

    if (!text) {
      this.logger.warn(`⚠️ Skipping document ${doc._id} - no content found`);
      return;
    }

    const embedding = await this.embeddings.embedQuery(text);

    const db = this.client.db();
    await db.collection('faqs').updateOne(
      { _id: doc._id },
      { $set: { embedding } }
    );

    this.logger.log(`✅ Auto-embedded: ${doc.title || doc._id}`);
  }

  async askQuestion(question: string, retries = 3): Promise<string> {
    if (!this.vectorStore) await this.initVectorStore();

    const retriever = this.vectorStore!.asRetriever({ k: 3 });

    const template = `
You are a helpful AI assistant for Entemla.
Answer briefly using the context below. Use simple English or Malayalam.

Context: {context}

Question: {question}
Answer:`;

    const prompt = PromptTemplate.fromTemplate(template);
    const docs = await retriever.invoke(question);
    const context = docs.map((d: any) => d.pageContent).join('\n\n');
    const finalPrompt = await prompt.format({ context, question });

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const result = await this.llm.invoke(finalPrompt);
        return (result.content as string) ||
          "Sorry, I don't have this information. Please contact support.";
      } catch (err: any) {
        if (err?.status === 429 && attempt < retries) {
          this.logger.warn(`LLM quota exceeded. Retrying in 30s... (attempt ${attempt}/${retries})`);
          await new Promise((r) => setTimeout(r, 30000));
        } else if (attempt === retries) {
          this.logger.error('❌ LLM failed after all retries');
          return "Sorry, I'm currently busy. Please try again in a moment.";
        }
      }
    }

    return "Sorry, I'm currently busy. Please try again in a moment.";
  }
}