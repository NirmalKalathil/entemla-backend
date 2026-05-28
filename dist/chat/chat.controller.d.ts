import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    chat(body: {
        question: string;
        lang: string;
    }): {
        answer: string;
    };
}
