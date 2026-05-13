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

    // =========================================
    // CREATE COMPLAINT
    // =========================================

    async create(createComplaintDto: CreateComplaintDto): Promise<Complaint> {
        const newComplaint = new this.complaintModel({
            ...createComplaintDto,
            citizenId: createComplaintDto.citizenId, // ✅ keep as string
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
            text: body.text,
            date: new Date(),
        };

        complaint.replies.push(newComment);

        await complaint.save();

        return newComment;
    }

    // =========================================
    // GET CITIZEN COMPLAINTS
    // =========================================

    async findByCitizen(citizenId: string) {
        return this.complaintModel
            .find({ citizenId })
            .populate('citizenId', 'name email')
            .exec();
    }

    // =========================================
    // GET ALL COMPLAINTS
    // EMPLOYEE DASHBOARD
    // =========================================

    async findAll() {
        return this.complaintModel
            .find()
            .populate('citizenId', 'name email') // 🔥 THIS FIXES NAME ISSUE
            .exec();
    }

    // =========================================
    // GET PUBLIC COMPLAINTS
    // PUBLIC FEED
    // =========================================

    async getPublicComplaints(): Promise<Complaint[]> {

        return await this.complaintModel

            .find({
                visibility: 'Public',
            })

            .populate(
                'citizenId',
                'name',
            )

            .sort({
                createdAt: -1,
            })

            .exec();
    }

    // =========================================
    // LIKE COMPLAINT
    // =========================================

    async likeComplaint(
        id: string,
    ): Promise<Complaint | null> {

        return await this.complaintModel.findByIdAndUpdate(

            id,

            {
                $inc: {
                    likes: 1,
                },
            },

            {
                new: true,
            },
        );
    }

    // =========================================
    // REPOST COMPLAINT
    // =========================================

    async repostComplaint(
        id: string,
    ): Promise<Complaint | null> {

        return await this.complaintModel.findByIdAndUpdate(

            id,

            {
                $inc: {
                    reposts: 1,
                },
            },

            {
                new: true,
            },
        );
    }

    // =========================================
    // ADD REPLY / COMMENT
    // =========================================

    async addReply(

        id: string,

        replyText: string,

        fromRole: string,
    ): Promise<Complaint | null> {

        const newReply = {

            from: fromRole,

            text: replyText,

            date: new Date(),
        };

        return await this.complaintModel.findByIdAndUpdate(

            id,

            {
                $push: {
                    replies: newReply,
                },
            },

            {
                new: true,
            },
        );
    }

    async getComplaintStats() {

        // Total complaints
        const totalComplaints =
            await this.complaintModel.countDocuments();

        // Resolved complaints
        const resolvedComplaints =
            await this.complaintModel.countDocuments({
                status: 'Resolved',
            });

        // In Progress complaints
        const inProgressComplaints =
            await this.complaintModel.countDocuments({
                status: 'In Progress',
            });

        // Average response time
        const complaints =
            await this.complaintModel.find();

        let totalDays = 0;

        complaints.forEach((complaint: any) => {

            if (
                complaint.createdAt &&
                complaint.updatedAt
            ) {

                const diffTime =
                    new Date(
                        complaint.updatedAt
                    ).getTime() -

                    new Date(
                        complaint.createdAt
                    ).getTime();

                const diffDays =
                    diffTime /
                    (1000 * 60 * 60 * 24);

                totalDays += diffDays;
            }
        });

        const avgResponse =
            complaints.length > 0
                ? (
                    totalDays /
                    complaints.length
                ).toFixed(1)
                : 0;

        return {

            totalComplaints,

            resolvedComplaints,

            inProgressComplaints,

            avgResponse,
        };
    }



    // =========================================
    // UPDATE STATUS
    // =========================================

    async updateStatus(
    id: string,
    status: string,
  ): Promise<Complaint | null> {
    return this.complaintModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
  }

  // =========================================
  // DELETE COMPLAINT
  // =========================================

  async remove(id: string) {
    return this.complaintModel.findByIdAndDelete(id);
}
}