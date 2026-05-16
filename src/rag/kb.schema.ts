import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class KnowledgeBase extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ type: [Number], default: [] })
  embedding: number[];

  @Prop({ default: 'general' })
  source: string;

  @Prop()
  category: string;
}

export const KnowledgeBaseSchema = SchemaFactory.createForClass(KnowledgeBase);
