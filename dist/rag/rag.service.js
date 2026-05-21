"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var RagService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RagService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const groq_1 = require("@langchain/groq");
const mongodb_1 = require("@langchain/mongodb");
const mongodb_2 = require("mongodb");
const prompts_1 = require("@langchain/core/prompts");
const embeddings_1 = require("@langchain/core/embeddings");
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
class GeminiEmbeddingsV1 extends embeddings_1.Embeddings {
    constructor(apiKey, model = 'gemini-embedding-001') {
        super({});
        this.logger = new common_1.Logger(GeminiEmbeddingsV1.name);
        this.apiKey = apiKey;
        this.modelName = model;
    }
    async embedQuery(text) {
        try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:embedContent?key=${this.apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: `models/${this.modelName}`,
                    content: { parts: [{ text: text.trim() }] },
                    outputDimensionality: 768,
                }),
            });
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${await res.text()}`);
            }
            const data = await res.json();
            if (!data.embedding?.values) {
                throw new Error(`Invalid embedding response`);
            }
            return data.embedding.values;
        }
        catch (error) {
            this.logger.error(`Embedding failed: ${error.message}`);
            throw error;
        }
    }
    async embedDocuments(texts) {
        const results = [];
        for (let i = 0; i < texts.length; i++) {
            if (i > 0)
                await new Promise(r => setTimeout(r, 1200));
            results.push(await this.embedQuery(texts[i]));
        }
        return results;
    }
}
let RagService = RagService_1 = class RagService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(RagService_1.name);
        this.vectorStore = null;
        this.client = null;
        this.changeStream = null;
        this.COLLECTION_NAME = 'faqs';
        const geminiApiKey = this.configService.get('GEMINI_API_KEY');
        const groqApiKey = this.configService.get('GROQ_API_KEY');
        if (!geminiApiKey || !groqApiKey) {
            throw new Error('Missing GEMINI_API_KEY or GROQ_API_KEY in environment');
        }
        this.embeddings = new GeminiEmbeddingsV1(geminiApiKey);
        this.llm = new groq_1.ChatGroq({
            apiKey: groqApiKey,
            model: "llama-3.3-70b-versatile",
            temperature: 0.1,
            maxTokens: 400,
        });
    }
    async onModuleInit() {
        await this.initVectorStore();
        await this.watchForChanges();
        const collection = this.client.db().collection(this.COLLECTION_NAME);
        if ((await collection.countDocuments()) === 0) {
            await this.seedInitialData();
        }
        setTimeout(() => this.performInitialCrawl(), 6000);
    }
    async onModuleDestroy() {
        if (this.changeStream)
            await this.changeStream.close();
        if (this.client)
            await this.client.close();
        this.logger.log('🔌 MongoDB connections closed safely.');
    }
    async seedInitialData() {
        this.logger.log('🌱 Seeding initial knowledge...');
        const collection = this.client.db().collection(this.COLLECTION_NAME);
        await collection.insertOne({
            content: "EnteMLA is an AI-powered platform for local governance in Kerala.",
            source: "manual-seed",
            updatedAt: new Date()
        });
    }
    async performInitialCrawl() {
        const baseUrl = 'http://localhost:5173';
        const pages = ['/', '/about', '/contact', '/complaints'];
        for (const page of pages) {
            await this.crawlWebsite(`${baseUrl}${page}`);
        }
    }
    async initVectorStore() {
        const uri = this.configService.get('MONGODB_URI');
        if (!uri)
            throw new Error('MONGODB_URI is not configured');
        this.client = new mongodb_2.MongoClient(uri);
        await this.client.connect();
        this.vectorStore = new mongodb_1.MongoDBAtlasVectorSearch(this.embeddings, {
            collection: this.client.db().collection(this.COLLECTION_NAME),
            indexName: 'vector_index',
            textKey: 'content',
            embeddingKey: 'embedding',
        });
        this.logger.log('✅ MongoDB Atlas Vector Store initialized');
    }
    async handleScheduledCrawl() {
        this.logger.log('🕛 Running daily scheduled crawl...');
        const baseUrl = 'http://127.0.0.1:3000';
        await this.crawlWebsite(baseUrl);
        await this.crawlWebsite(`${baseUrl}/about`);
    }
    async crawlWebsite(url) {
        this.logger.log(`🌐 Crawling: ${url}`);
        try {
            const { data } = await axios_1.default.get(url, {
                headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EnteMLA-Bot/1.0)' },
                timeout: 15000,
            });
            const $ = cheerio.load(data);
            const textChunks = new Set();
            $('main, article, .content, body')
                .find('p, h1, h2, h3, li, span, div')
                .each((_, el) => {
                const text = $(el).text().trim().replace(/\s+/g, ' ');
                if (text.length > 30)
                    textChunks.add(text);
            });
            const collection = this.client.db().collection(this.COLLECTION_NAME);
            let ingested = 0;
            for (const chunk of textChunks) {
                const result = await collection.updateOne({ content: chunk }, { $set: { content: chunk, source: url, updatedAt: new Date() } }, { upsert: true });
                if (result.upsertedCount > 0 || result.modifiedCount > 0)
                    ingested++;
            }
            this.logger.log(`📚 Ingested ${ingested} chunks from ${url}`);
        }
        catch (error) {
            this.logger.warn(`⚠️ Crawl failed for ${url}: ${error.message}`);
        }
    }
    async watchForChanges() {
        const collection = this.client.db().collection(this.COLLECTION_NAME);
        this.changeStream = collection.watch([], { fullDocument: 'updateLookup' });
        this.changeStream.on('change', async (change) => {
            if (['insert', 'update', 'replace'].includes(change.operationType) && change.fullDocument) {
                const doc = change.fullDocument;
                if (!doc.embedding || doc.embedding.length !== 768) {
                    await this.embedDocument(doc);
                }
            }
        });
        this.logger.log('👀 Change stream active for embeddings');
    }
    async embedDocument(doc) {
        try {
            const text = doc.content?.trim();
            if (!text)
                return;
            const embedding = await this.embeddings.embedQuery(text);
            await this.client.db().collection(this.COLLECTION_NAME).updateOne({ _id: doc._id }, { $set: { embedding } });
        }
        catch (e) {
            this.logger.error(`❌ Failed to embed document: ${e.message}`);
        }
    }
    async embedAndStore(content, source = 'user-input') {
        if (!content || content.trim().length < 10) {
            throw new Error('Content too short to store');
        }
        const collection = this.client.db().collection(this.COLLECTION_NAME);
        const result = await collection.updateOne({ content: content.trim() }, {
            $set: {
                content: content.trim(),
                source,
                updatedAt: new Date(),
            },
        }, { upsert: true });
        this.logger.log(`📝 Learned: ${source} ${result.upsertedCount ? '(new)' : '(updated)'}`);
        if (result.upsertedId) {
            const newDoc = await collection.findOne({ _id: result.upsertedId });
            if (newDoc)
                await this.embedDocument(newDoc);
        }
    }
    async askQuestion(question, lang = 'English', history = []) {
        if (!this.vectorStore)
            await this.initVectorStore();
        const effectiveLang = lang.toLowerCase() === 'malayalam' ? 'Malayalam' : 'English';
        const retriever = this.vectorStore.asRetriever({ k: 5 });
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
        const prompt = prompts_1.PromptTemplate.fromTemplate(template);
        const finalPrompt = await prompt.format({ context, question });
        const result = await this.llm.invoke(finalPrompt);
        return result.content.trim();
    }
    getLanguageInstructions(lang) {
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
};
exports.RagService = RagService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RagService.prototype, "handleScheduledCrawl", null);
exports.RagService = RagService = RagService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RagService);
//# sourceMappingURL=rag.service.js.map