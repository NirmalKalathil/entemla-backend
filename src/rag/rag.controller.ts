import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { RagService } from './rag.service';

@Controller('ai')
export class RagController {
  constructor(private readonly ragService: RagService) {}

  @Post('chat')
  async chat(
    @Body() body: {
      question: string;
      lang?: string;
      history?: { role: string; content: string }[];
    },
  ) {
    if (!body.question?.trim()) {
      throw new BadRequestException('Question is required');
    }

    const answer = await this.ragService.askQuestion(
      body.question.trim(),
      body.lang || 'English',
      body.history || []
    );

    return { answer };
  }

  @Post('teach')
  async teach(@Body() body: { content: string; source?: string }) {
    if (!body.content?.trim()) {
      throw new BadRequestException('Content is required');
    }

    await this.ragService.embedAndStore(
      body.content.trim(),
      body.source || 'user-submitted'
    );

    return { 
      success: true, 
      message: 'Successfully learned new information' 
    };
  }
}