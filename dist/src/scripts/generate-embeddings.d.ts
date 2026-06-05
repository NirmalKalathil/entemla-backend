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
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    private initVectorStore;
    private watchForChanges;
    private embedDocument;
    askQuestion(question: string, retries?: number): Promise<string>;
}
