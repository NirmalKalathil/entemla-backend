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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var KbService_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KbService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const schedule_1 = require("@nestjs/schedule");
const rag_service_1 = require("./rag.service");
const mlas_json_1 = __importDefault(require("../data/mlas.json"));
let KbService = KbService_1 = class KbService {
    constructor(kbModel, ragService) {
        this.kbModel = kbModel;
        this.ragService = ragService;
        this.logger = new common_1.Logger(KbService_1.name);
    }
    async onModuleInit() {
        this.logger.log('🌐 KB Service initialized');
        await this.seedInitialKnowledge();
        setTimeout(() => this.crawlEntireWebsite('http://localhost:5173/'), 8000);
    }
    async seedInitialKnowledge() {
        const proceduralData = [
            {
                content: `How to file a complaint in EnteMLA:\n1. Login to your EnteMLA account.\n2. Click on "New Grievance" or "File Complaint".\n3. Select the department and category.\n4. Fill in the complaint details with proper description.\n5. Upload supporting documents if any.\n6. Submit the complaint.\nYou will receive a tracking ID via SMS and email.`,
                source: 'procedure-file-complaint'
            },
            {
                content: `How to track complaint:\n1. Login to EnteMLA.\n2. Go to "My Complaints" section.\n3. Enter your tracking ID or select the complaint.\n4. View current status and updates.`,
                source: 'procedure-track-complaint'
            },
            {
                content: 'EnteMLA office hours are Monday to Saturday, 10 AM to 5 PM.',
                source: 'manual-hours',
            },
            {
                content: 'To file a complaint, log in and click the file complaint in home page. Fill in the details and submit.',
                source: 'manual-complaint',
            },
            {
                content: 'You can track your complaint status using the unique tracking ID sent after submission.',
                source: 'manual-tracking',
            },
        ];
        const combinedSeedData = [...proceduralData, ...mlas_json_1.default];
        this.logger.log(`🌱 Seeding ${combinedSeedData.length} records into KB...`);
        for (const item of combinedSeedData) {
            await this.kbModel.updateOne({ source: item.source }, { $set: { ...item, updatedAt: new Date() } }, { upsert: true });
            await this.ragService.embedAndStore(item.content, item.source);
        }
        this.logger.log('✅ Initial seed knowledge loaded into KB and Vector Store');
    }
    async scheduledCrawl() {
        this.logger.log('🔄 Starting scheduled daily crawl...');
        await this.crawlEntireWebsite('http://localhost:5173/');
    }
    async crawlEntireWebsite(baseUrl) {
        const targetPages = ['/', '/about', '/help', '/faq', '/contact', '/complaints', '/services'];
        this.logger.log(`🌐 Starting full website crawl for ${targetPages.length} pages...`);
        for (const page of targetPages) {
            const fullUrl = `${baseUrl}${page}`;
            try {
                const { data } = await axios_1.default.get(fullUrl, {
                    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EnteMLA-Bot/1.0)' },
                    timeout: 12000,
                });
                const $ = cheerio.load(data);
                $('script, style, nav, footer, header, aside, .sidebar, .menu, .nav').remove();
                const textChunks = [];
                $('main, article, .content, #content, .post, section').each((_, section) => {
                    $(section).find('h1, h2, h3, p, li, td, th').each((_, el) => {
                        const text = $(el).text().trim().replace(/\s+/g, ' ');
                        if (text.length > 40)
                            textChunks.push(text);
                    });
                });
                if (textChunks.length === 0) {
                    const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
                    if (bodyText.length > 100)
                        textChunks.push(bodyText);
                }
                let totalIngested = 0;
                for (const chunk of textChunks) {
                    const result = await this.kbModel.updateOne({ content: chunk }, {
                        $set: {
                            content: chunk,
                            source: fullUrl,
                            updatedAt: new Date(),
                        },
                    }, { upsert: true });
                    if (result.upsertedCount > 0 || result.modifiedCount > 0) {
                        await this.ragService.embedAndStore(chunk, fullUrl);
                        totalIngested++;
                    }
                }
                this.logger.log(`✅ Crawled ${page} → ${totalIngested} chunks ingested`);
            }
            catch (error) {
                this.logger.warn(`⚠️ Failed to crawl ${page}: ${error.message}`);
            }
        }
        const totalDocs = await this.kbModel.countDocuments();
        this.logger.log(`📊 Knowledge Base sync completed. Total documents: ${totalDocs}`);
    }
    async getRelevantContext(query, limit = 6) {
        if (!query?.trim())
            return '';
        const keywords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
        const results = await this.kbModel
            .find({
            $or: [
                { content: { $regex: keywords.join('|'), $options: 'i' } },
                { source: { $regex: keywords.join('|'), $options: 'i' } },
            ],
        })
            .sort({ updatedAt: -1 })
            .limit(limit)
            .lean();
        return results.map(doc => doc.content).join('\n\n---\n\n');
    }
    async clearKnowledgeBase() {
        await this.kbModel.deleteMany({});
        this.logger.warn('🗑️ Knowledge Base cleared');
    }
    async getStats() {
        return {
            totalDocuments: await this.kbModel.countDocuments(),
            lastUpdated: await this.kbModel.findOne().sort({ updatedAt: -1 }).select('updatedAt'),
        };
    }
};
exports.KbService = KbService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KbService.prototype, "scheduledCrawl", null);
exports.KbService = KbService = KbService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('KnowledgeBase')),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => rag_service_1.RagService))),
    __metadata("design:paramtypes", [mongoose_2.Model, typeof (_a = typeof rag_service_1.RagService !== "undefined" && rag_service_1.RagService) === "function" ? _a : Object])
], KbService);
//# sourceMappingURL=kb.service.js.map