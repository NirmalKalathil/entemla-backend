import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Complaint } from './schemas/complaint.schema';
import { CreateComplaintDto } from './dto/complaint.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class ComplaintsService {

  

  constructor(
    @InjectModel(Complaint.name)
    private complaintModel: Model<Complaint>,
  ) { }

  async create(createComplaintDto: CreateComplaintDto): Promise<Complaint> {
    const newComplaint = new this.complaintModel({
      ...createComplaintDto,
      citizenId: createComplaintDto.citizenId,
    });
    return await newComplaint.save();
  }

  async addComment(id: string, body: CreateCommentDto) {
    const complaint = await this.complaintModel.findById(id);
    if (!complaint) {
      throw new Error('Complaint not found');
    }
    const newComment = {
      userId: new Types.ObjectId(body.userId),
      username: body.username,
      role: body.role,
      text: body.text,
      date: new Date(),
    };
    complaint.replies.push(newComment);
    await complaint.save();
    return newComment;
  }

  async findByCitizen(citizenId: string) {
    return this.complaintModel
      .find({ citizenId })
      .populate('citizenId', 'name email')
      .exec();
  }

  async findAll() {
    return this.complaintModel
      .find()
      .populate('citizenId', 'name email')
      .exec();
  }

  async getPublicComplaints(): Promise<Complaint[]> {
    return await this.complaintModel
      .find({ visibility: 'Public' })
      .populate('citizenId', 'name')
      .sort({ createdAt: -1 })
      .exec();
  }

  async likeComplaint(id: string): Promise<Complaint | null> {
    return await this.complaintModel.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true },
    );
  }

  async repostComplaint(id: string): Promise<Complaint | null> {
    return await this.complaintModel.findByIdAndUpdate(
      id,
      { $inc: { reposts: 1 } },
      { new: true },
    );
  }

  async addReply(
    id: string,
    replyText: string,
    fromRole: string,
    username: string,
  ) {

    const normalizedRole =
      (fromRole || 'citizen').toLowerCase();

    const fromLabel =
      normalizedRole === 'employee' ? 'Employee' :
        normalizedRole === 'mla' ? 'MLA' :
          'Citizen';

    const newReply = {
      text: replyText,
      username,
      from: fromLabel,
      role: normalizedRole,
      createdAt: new Date(),
    };

    return this.complaintModel.findByIdAndUpdate(
      id,
      { $push: { replies: newReply } },
      { new: true },
    );
  }

  async getComplaintStats() {
    const totalComplaints = await this.complaintModel.countDocuments();
    const resolvedComplaints = await this.complaintModel.countDocuments({ status: 'Resolved' });
    const inProgressComplaints = await this.complaintModel.countDocuments({ status: 'In Progress' });

    const complaints = await this.complaintModel.find();
    let totalDays = 0;

    complaints.forEach((complaint: any) => {
      if (complaint.createdAt && complaint.updatedAt) {
        const diffTime = new Date(complaint.updatedAt).getTime() - new Date(complaint.createdAt).getTime();
        totalDays += diffTime / (1000 * 60 * 60 * 24);
      }
    });

    const avgResponse = complaints.length > 0
      ? (totalDays / complaints.length).toFixed(1)
      : 0;

    return { totalComplaints, resolvedComplaints, inProgressComplaints, avgResponse };
  }

  async updateStatus(id: string, status: string, comment?: string): Promise<Complaint | null> {
    return this.complaintModel.findByIdAndUpdate(
      id,
      { status, comment },
      { new: true },
    );
  }

  async remove(id: string) {
    return this.complaintModel.findByIdAndDelete(id);
  }

  async sendMessage(id: string, comment: string, username: string, role: string) {
    const fromLabel =
      role === 'employee' ? 'Employee' :
        role === 'mla' ? 'MLA' :
          'Citizen';

    return this.complaintModel.findByIdAndUpdate(
      id,
      {
        $push: {
          replies: {
            text: comment,
            username,
            from: fromLabel,
            role: role,        // ✅ saves role correctly
            createdAt: new Date(),
          },
        },
      },
      { new: true },
    );
  }
}