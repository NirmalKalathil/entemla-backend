import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Banner extends Document {

  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  createdBy: string;
}

export const BannerSchema =
  SchemaFactory.createForClass(Banner);