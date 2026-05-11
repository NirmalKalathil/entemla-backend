import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string; // Change 'username' to 'name' here

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  place: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['citizen', 'employee', 'mla'], default: 'citizen' })
  role!: string;
}
export const UserSchema = SchemaFactory.createForClass(User);