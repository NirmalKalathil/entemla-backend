import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ComplaintDocument = HydratedDocument<Complaint>;

@Schema({ timestamps: true })
export class Complaint {

  @Prop({ required: true })
  title !: string;

  @Prop({ required: true })
  category !: string;

  @Prop({
    required: true,
    enum: ['Normal', 'Medium', 'Urgent'],
    default: 'Normal',
  })
  urgency !: string;

  @Prop({ required: true })
  details !: string;

  @Prop({ default: 'Public' })
  visibility!: string;

  @Prop({ default: 'Pending' })
  status!: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  citizenId!: Types.ObjectId;

  @Prop()
  location?: string;

  @Prop({ default: 0 })
  likes !: number;

  // Users who liked this complaint
  @Prop({
    type: [Types.ObjectId],
    ref: 'User',
    default: [],
  })
  likedBy!: Types.ObjectId[];

  // Total repost count
  @Prop({ default: 0 })
  reposts!: number;

  @Prop({
    type: [Types.ObjectId],
    ref: 'User',
    default: [],
  })
  repostedBy!: Types.ObjectId[];

  @Prop({ default: 0 })
  views!: number;

  @Prop({ default: "" })
  comment!: string;

  // Keep your existing string reason
  @Prop()
  rejectionReason: string;

  @Prop()
  rejectedByName: string;

  @Prop()
  rejectedByRole: string;

  // ADD THIS: Track who authorized the rejection
  @Prop({
    type: {
      adminId: { type: Types.ObjectId, ref: 'User' },
      username: { type: String },
      role: { type: String, enum: ['employee', 'mla'] }
    },
    default: null,
  })
  rejectedBy!: {
    adminId: Types.ObjectId;
    username: string;
    role: string;
  } | null;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  constituencyId: Types.ObjectId;

  @Prop({
    default: null,
  })
  evidence: string;

  @Prop({
    type: [
      {
        userId: {
          type: Types.ObjectId,
          ref: 'User',

        },

        text: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        from: {
          type: String,
          default: 'Citizen',
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        role: {
          type: String,
          enum: ['citizen', 'employee', 'mla'],
          default: 'citizen',
        },


      },
    ],

    default: [],
  })
  replies!: {
    userId?: Types.ObjectId;
    username?: string;
    text: string;
    role?: string;

    from?: string;
    createdAt?: Date;

  }[];


}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);