import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('ai')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('chat')
  chat(@Body() body: { question: string; lang: string }) {
    const answer = this.chatService.getAnswer(
      body.question,
      body.lang || 'English',
    );
    return { answer };
  }
}
