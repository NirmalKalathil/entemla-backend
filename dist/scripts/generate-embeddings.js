"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RagService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RagService = void 0;
const common_1 = require("@nestjs/common");
const google_genai_1 = require("@langchain/google-genai");
const mongodb_1 = require("@langchain/mongodb");
const mongodb_2 = require("mongodb");
const prompts_1 = require("@langchain/core/prompts");
const config_1 = require("@nestjs/config");
const embeddings_1 = require("@langchain/core/embeddings");
class GeminiEmbeddingsV1 extends embeddings_1.Embeddings {
    constructor(apiKey, model = 'gemini-embedding-001') {
        super({});
        this.logger = new common_1.Logger('GeminiEmbeddings');
        this.apiKey = apiKey;
        this.model = model;
    }
    async embedQuery(text, retries = 3) {
        for (let attempt = 1; attempt <= retries; attempt++) {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${this.model}:embedContent?key=${this.apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: `models/${this.model}`,
                    content: { parts: [{ text }] },
                }),
            });
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
    async embedDocuments(texts) {
        const results = [];
        for (const text of texts) {
            const embedding = await this.embedQuery(text);
            results.push(embedding);
            await this.sleep(1000);
        }
        return results;
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
let RagService = RagService_1 = class RagService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(RagService_1.name);
        this.vectorStore = null;
        this.client = null;
        this.changeStream = null;
        const apiKey = this.configService.get('GEMINI_API_KEY');
        if (!apiKey)
            throw new Error('GEMINI_API_KEY is not defined in .env');
        this.embeddings = new GeminiEmbeddingsV1(apiKey, 'gemini-embedding-001');
        this.llm = new google_genai_1.ChatGoogleGenerativeAI({
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
        if (this.changeStream)
            await this.changeStream.close();
        if (this.client)
            await this.client.close();
        this.logger.log('🔌 MongoDB connection closed');
    }
    async initVectorStore() {
        const uri = this.configService.get('MONGODB_URI');
        if (!uri)
            throw new Error('MONGODB_URI is not defined in .env');
        this.client = new mongodb_2.MongoClient(uri);
        await this.client.connect();
        const db = this.client.db();
        const collection = db.collection('faqs');
        this.vectorStore = new mongodb_1.MongoDBAtlasVectorSearch(this.embeddings, {
            collection: collection,
            indexName: 'vector_index',
            textKey: 'content',
            embeddingKey: 'embedding',
        });
        this.logger.log('✅ Vector Store Connected Successfully');
    }
    async watchForChanges() {
        if (!this.client)
            return;
        const db = this.client.db();
        const collection = db.collection('faqs');
        this.changeStream = collection.watch([], { fullDocument: 'updateLookup' });
        this.logger.log('👀 Watching MongoDB for FAQ changes...');
        this.changeStream.on('change', async (change) => {
            try {
                const operationType = change.operationType;
                if (operationType === 'insert') {
                    const doc = change.fullDocument;
                    this.logger.log(`📝 New FAQ detected: ${doc.title || doc._id}`);
                    await this.embedDocument(doc);
                }
                else if (operationType === 'update' || operationType === 'replace') {
                    const doc = change.fullDocument;
                    if (doc) {
                        this.logger.log(`✏️ FAQ updated: ${doc.title || doc._id}`);
                        await this.embedDocument(doc);
                    }
                }
                else if (operationType === 'delete') {
                    this.logger.log(`🗑️ FAQ deleted: ${change.documentKey._id}`);
                }
            }
            catch (err) {
                this.logger.error('❌ Error processing change stream event:', err);
            }
        });
        this.changeStream.on('error', (err) => {
            this.logger.error('❌ Change stream error:', err);
        });
    }
    async embedDocument(doc) {
        if (!this.client)
            return;
        const text = doc.content ||
            `${doc.title || ''} ${doc.question || ''} ${doc.answer || ''}`.trim();
        if (!text) {
            this.logger.warn(`⚠️ Skipping document ${doc._id} - no content found`);
            return;
        }
        const embedding = await this.embeddings.embedQuery(text);
        const db = this.client.db();
        await db.collection('faqs').updateOne({ _id: doc._id }, { $set: { embedding } });
        this.logger.log(`✅ Auto-embedded: ${doc.title || doc._id}`);
    }
    async askQuestion(question, retries = 3) {
        if (!this.vectorStore)
            await this.initVectorStore();
        const retriever = this.vectorStore.asRetriever({ k: 3 });
        const template = `
You are a helpful AI assistant for Entemla.
Answer briefly using the context below. Use simple English or Malayalam.

Context: {context}

Question: {question}
Answer:`;
        const prompt = prompts_1.PromptTemplate.fromTemplate(template);
        const docs = await retriever.invoke(question);
        const context = docs.map((d) => d.pageContent).join('\n\n');
        const finalPrompt = await prompt.format({ context, question });
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const result = await this.llm.invoke(finalPrompt);
                return result.content ||
                    "Sorry, I don't have this information. Please contact support.";
            }
            catch (err) {
                if (err?.status === 429 && attempt < retries) {
                    this.logger.warn(`LLM quota exceeded. Retrying in 30s... (attempt ${attempt}/${retries})`);
                    await new Promise((r) => setTimeout(r, 30000));
                }
                else if (attempt === retries) {
                    this.logger.error('❌ LLM failed after all retries');
                    return "Sorry, I'm currently busy. Please try again in a moment.";
                }
            }
        }
        return "Sorry, I'm currently busy. Please try again in a moment.";
    }
};
exports.RagService = RagService;
exports.RagService = RagService = RagService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RagService);
//# sourceMappingURL=generate-embeddings.js.map