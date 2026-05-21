import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RagService } from './rag.service';
import { RagController } from './rag.controller';
import { KbService } from './kb.service';
import { KnowledgeBase, KnowledgeBaseSchema } from './kb.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forFeature([
      { name: 'KnowledgeBase', schema: KnowledgeBaseSchema },
    ]),
  ],
  controllers: [RagController],
  providers: [
    {
      provide: RagService,
      useClass: RagService,
    },
    {
      provide: KbService,
      useClass: KbService,
    },
  ],
  exports: [RagService, KbService],
})
export class RagModule {}