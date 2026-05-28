import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { KnowledgeBase } from './kb.schema';
import { RagService } from './rag.service';
export declare class KbService implements OnModuleInit {
    private readonly kbModel;
    private readonly ragService;
    private readonly logger;
    constructor(kbModel: Model<KnowledgeBase>, ragService: RagService);
    onModuleInit(): Promise<void>;
    private seedInitialKnowledge;
    scheduledCrawl(): Promise<void>;
    crawlEntireWebsite(baseUrl: string): Promise<void>;
    getRelevantContext(query: string, limit?: number): Promise<string>;
    clearKnowledgeBase(): Promise<void>;
    getStats(): Promise<{
        totalDocuments: number;
        lastUpdated: any;
    }>;
}
