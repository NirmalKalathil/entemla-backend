import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ChatGroq } from "@langchain/groq";
import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';
import { MongoClient, ChangeStream } from 'mongodb';
import { PromptTemplate } from '@langchain/core/prompts';
import { Embeddings } from '@langchain/core/embeddings';
import axios from 'axios';
import * as cheerio from 'cheerio';

class GeminiEmbeddingsV1 extends Embeddings {
  private readonly logger = new Logger(GeminiEmbeddingsV1.name);
  private apiKey: string;
  private modelName: string;

  constructor(apiKey: string, model = 'gemini-embedding-001') {
    super({});
    this.apiKey = apiKey;
    this.modelName = model;
  }

  async embedQuery(text: string): Promise<number[]> {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:embedContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: `models/${this.modelName}`,
            content: { parts: [{ text: text.trim() }] },
            outputDimensionality: 768,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${await res.text()}`);
      }

      const data = await res.json();
      if (!data.embedding?.values) {
        throw new Error(`Invalid embedding response`);
      }
      return data.embedding.values;
    } catch (error) {
      this.logger.error(`Embedding failed: ${(error as Error).message}`);
      throw error;
    }
  }

  async embedDocuments(texts: string[]): Promise<number[][]> {
    const results: number[][] = [];
    for (let i = 0; i < texts.length; i++) {
      if (i > 0) await new Promise(r => setTimeout(r, 1200)); // Respect rate limits
      results.push(await this.embedQuery(texts[i]));
    }
    return results;
  }
}

@Injectable()
export class RagService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RagService.name);
  private embeddings: GeminiEmbeddingsV1;
  private llm: ChatGroq;
  private vectorStore: MongoDBAtlasVectorSearch | null = null;
  private client: MongoClient | null = null;
  private changeStream: ChangeStream | null = null;
  private readonly COLLECTION_NAME = 'faqs';

  constructor(private configService: ConfigService) {
    const geminiApiKey = this.configService.get<string>('GEMINI_API_KEY');
    const groqApiKey = this.configService.get<string>('GROQ_API_KEY');

    if (!geminiApiKey || !groqApiKey) {
      throw new Error('Missing GEMINI_API_KEY or GROQ_API_KEY in environment');
    }

    this.embeddings = new GeminiEmbeddingsV1(geminiApiKey);
    this.llm = new ChatGroq({
      apiKey: groqApiKey,
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
      maxTokens: 400,
    });
  }

  async onModuleInit() {
    await this.initVectorStore();
    await this.watchForChanges();

    const collection = this.client!.db().collection(this.COLLECTION_NAME);
    if ((await collection.countDocuments()) === 0) {
      await this.seedInitialData();
    }

    // Initial website crawl after server starts
    setTimeout(() => this.performInitialCrawl(), 6000);
  }

  async onModuleDestroy() {
    if (this.changeStream) await this.changeStream.close();
    if (this.client) await this.client.close();
    this.logger.log('🔌 MongoDB connections closed safely.');
  }

  private async seedInitialData() {
    this.logger.log('🌱 Seeding initial knowledge...');
    const collection = this.client!.db().collection(this.COLLECTION_NAME);
    await collection.insertOne({
      content: "EnteMLA is an AI-powered platform for local governance in Kerala.",
      source: "manual-seed",
      updatedAt: new Date()
    });
  }

  private async performInitialCrawl() {
    const baseUrl = 'http://localhost:5173';
    const pages = ['/', '/about', '/contact', '/complaints'];

    for (const page of pages) {
      await this.crawlWebsite(`${baseUrl}${page}`);
    }
  }

  private async initVectorStore() {
    const uri = this.configService.get<string>('MONGODB_URI');
    if (!uri) throw new Error('MONGODB_URI is not configured');

    this.client = new MongoClient(uri);
    await this.client.connect();

    this.vectorStore = new MongoDBAtlasVectorSearch(this.embeddings, {
      collection: this.client.db().collection(this.COLLECTION_NAME) as any,
      indexName: 'vector_index',
      textKey: 'content',
      embeddingKey: 'embedding',
    });

    this.logger.log('✅ MongoDB Atlas Vector Store initialized');
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleScheduledCrawl() {
    this.logger.log('🕛 Running daily scheduled crawl...');
    const baseUrl = 'http://127.0.0.1:3000';
    await this.crawlWebsite(baseUrl);
    await this.crawlWebsite(`${baseUrl}/about`);
  }

  async crawlWebsite(url: string) {
    this.logger.log(`🌐 Crawling: ${url}`);
    try {
      const { data } = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EnteMLA-Bot/1.0)' },
        timeout: 15000,
      });

      const $ = cheerio.load(data);
      const textChunks = new Set<string>();

      $('main, article, .content, body')
        .find('p, h1, h2, h3, li, span, div')
        .each((_, el) => {
          const text = $(el).text().trim().replace(/\s+/g, ' ');
          if (text.length > 30) textChunks.add(text);
        });

      const collection = this.client!.db().collection(this.COLLECTION_NAME);
      let ingested = 0;

      for (const chunk of textChunks) {
        const result = await collection.updateOne(
          { content: chunk },
          { $set: { content: chunk, source: url, updatedAt: new Date() } },
          { upsert: true }
        );
        if (result.upsertedCount > 0 || result.modifiedCount > 0) ingested++;
      }

      this.logger.log(`📚 Ingested ${ingested} chunks from ${url}`);
    } catch (error) {
      this.logger.warn(`⚠️ Crawl failed for ${url}: ${(error as Error).message}`);
    }
  }

  private async watchForChanges() {
    const collection = this.client!.db().collection(this.COLLECTION_NAME);
    this.changeStream = collection.watch([], { fullDocument: 'updateLookup' });

    this.changeStream.on('change', async (change: any) => {
      if (['insert', 'update', 'replace'].includes(change.operationType) && change.fullDocument) {
        const doc = change.fullDocument;
        if (!doc.embedding || doc.embedding.length !== 768) {
          await this.embedDocument(doc);
        }
      }
    });

    this.logger.log('👀 Change stream active for embeddings');
  }

  private async embedDocument(doc: any) {
    try {
      const text = doc.content?.trim();
      if (!text) return;

      const embedding = await this.embeddings.embedQuery(text);

      await this.client!.db().collection(this.COLLECTION_NAME).updateOne(
        { _id: doc._id },
        { $set: { embedding } }
      );
    } catch (e) {
      this.logger.error(`❌ Failed to embed document: ${(e as Error).message}`);
    }
  }

  async embedAndStore(content: string, source: string = 'user-input') {
    if (!content || content.trim().length < 10) {
      throw new Error('Content too short to store');
    }

    const collection = this.client!.db().collection(this.COLLECTION_NAME);

    const result = await collection.updateOne(
      { content: content.trim() },
      {
        $set: {
          content: content.trim(),
          source,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    this.logger.log(`📝 Learned: ${source} ${result.upsertedCount ? '(new)' : '(updated)'}`);

    if (result.upsertedId) {
      const newDoc = await collection.findOne({ _id: result.upsertedId });
      if (newDoc) await this.embedDocument(newDoc);
    }
  }

  // ====================== MAIN CHAT METHOD ======================
  async askQuestion(
    question: string,
    lang: string = 'English',
    history: { role: string; content: string }[] = []
  ): Promise<string> {
    if (!this.vectorStore) await this.initVectorStore();

    const effectiveLang = lang.toLowerCase() === 'malayalam' ? 'Malayalam' : 'English';
    const retriever = this.vectorStore!.asRetriever({ k: 5 });

    const docs = await retriever.invoke(question);

    if (docs.length === 0) {
      return effectiveLang === 'Malayalam'
        ? "ക്ഷമിക്കണം, ഈ വിവരം നിലവിൽ ലഭ്യമല്ല."
        : "Sorry, I don't have information on this topic yet.";
    }

    const context = docs.map(d => d.pageContent).join('\n\n---\n\n');

    let historyContext = '';
    if (history.length > 0) {
      historyContext = `\nRecent Conversation:\n${history
        .slice(-6)
        .map(h => `${h.role}: ${h.content}`)
        .join('\n')}`;
    }

    const langInstructions = this.getLanguageInstructions(effectiveLang);

    const template = `
You are the official EnteMLA Assistant, helping citizens find information about Kerala MLAs and system procedures.

${langInstructions}

CRITICAL INSTRUCTIONS FOR RELEVANCY AND CONCISE RESPONSES:
1. If the user explicitly asks for a phone number or contact details of an MLA, extract the phone number from the context and provide ONLY that direct answer cleanly (e.g., "The phone number for K. Rajan is 9400006300."). Do not add conversational filler.
2. If the context states a number is not available, state that clearly.
3. For general procedural questions, provide step-by-step instructions.
4. Base your answers strictly on the context provided below. Do not hallucinate or make up phone numbers.

${historyContext}

### FINAL INSTRUCTION:
Answer using the provided context. Be direct, concise, and actionable.

Context:
{context}

Question: {question}
Answer:`;

    const prompt = PromptTemplate.fromTemplate(template);
    const finalPrompt = await prompt.format({ context, question });

    const result = await this.llm.invoke(finalPrompt);
    return (result.content as string).trim();
  }

  private getLanguageInstructions(lang: string): string {
    const rules = `
### RESPONSE RULES:
- Give the direct answer first.
- Add one specific actionable step.
- Maximum 2-3 short sentences.
- Professional and helpful tone.`;

    if (lang === 'Malayalam') {
      return `### LANGUAGE: Respond ONLY in Malayalam (മലയാളം).\n${rules}`;
    }
    return `### LANGUAGE: Respond ONLY in English.\n${rules}`;
  }
}