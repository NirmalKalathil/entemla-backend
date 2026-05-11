import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true }) // Adds createdAt and updatedAt automatically
export class Complaint extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, enum: ['Normal', 'Medium', 'Urgent'], default: 'Normal' })
  urgency: string;

  @Prop({ required: true })
  details: string;

  @Prop({ default: 'Public' })
  visibility: string;

  @Prop({ default: 'Pending' }) // Managed by Employees: Pending, In Progress, Resolved, Rejected
  status: string;

  // 🔥 This links the complaint to the Citizen who created it
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  citizenId: Types.ObjectId;

  @Prop()
  evidence?: string; // Filename for uploaded images

  @Prop({ type: [{ from: String, text: String, date: { type: Date, default: Date.now } }] })
  replies: { from: string; text: string; date: Date }[];
}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);