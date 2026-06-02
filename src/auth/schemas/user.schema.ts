import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  district: string;

  // 🔥 IMPORTANT: use ONE consistent field (string ID system)
  @Prop({ required: true })
  constituencyId: string;

  @Prop({ required: true })
  place: string;

  @Prop({ required: true })
  password: string;

  // 👇 CORE ROLE SYSTEM
  @Prop({
    required: true,
    enum: ['citizen', 'employee', 'mla', 'admin'],
    default: 'citizen'
  })
  role: string;

  @Prop({ default: '' })
  photo: string;

  @Prop({ default: '' })
  party: string;

  // 🏛️ MLA-specific ID
  @Prop({ unique: true, sparse: true })
  mlaId?: string;

  // 👷 Employee-specific ID
  @Prop({ unique: true, sparse: true })
  employeeId?: string;

  // 👑 Who created this user (admin tracking)
  @Prop()
  createdBy?: string;

  // 🔐 optional (VERY useful later)
  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);