import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class RagService implements OnModuleInit, OnModuleDestroy {
    private configService;
    private readonly logger;
    private embeddings;
    private llm;
    private vectorStore;
    private client;
    private changeStream;
    private readonly COLLECTION_NAME;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    private seedInitialData;
    private performInitialCrawl;
    private initVectorStore;
    handleScheduledCrawl(): Promise<void>;
    crawlWebsite(url: string): Promise<void>;
    private watchForChanges;
    private embedDocument;
    embedAndStore(content: string, source?: string): Promise<void>;
    askQuestion(question: string, lang?: string, history?: {
        role: string;
        content: string;
    }[]): Promise<string>;
    private getLanguageInstructions;
}
