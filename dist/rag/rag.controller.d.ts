import { RagService } from './rag.service';
export declare class RagController {
    private readonly ragService;
    constructor(ragService: RagService);
    chat(body: {
        question: string;
        lang?: string;
        history?: {
            role: string;
            content: string;
        }[];
    }): Promise<{
        answer: string;
    }>;
    teach(body: {
        content: string;
        source?: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
