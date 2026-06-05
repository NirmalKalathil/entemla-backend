import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Complaint } from './schemas/complaint.schema';
import { CreateComplaintDto } from './dto/complaint.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from '../auth/schemas/user.schema';
import { S3Service } from '../../s3/s3.service';

@Injectable()
export class ComplaintsService {



  constructor(
    @InjectModel(Complaint.name)
    private complaintModel: Model<Complaint>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly s3Service: S3Service,
  ) { }

  async create(
    createComplaintDto: CreateComplaintDto,
    file?: Express.Multer.File,
  ) {
    const citizen = await this.userModel.findById(
      createComplaintDto.citizenId,
    );

    if (!citizen) {
      throw new BadRequestException(
        'Invalid citizen ID',
      );
    }

    if (!citizen.constituencyId) {
      throw new BadRequestException(
        'Citizen missing constituencyId',
      );
    }

    let evidenceUrl: string | null = null;

    if (file) {
      evidenceUrl =
        await this.s3Service.uploadFile(file);
    }

    const newComplaint = new this.complaintModel({
      ...createComplaintDto,
      citizenId: citizen._id,
      constituencyId: citizen.constituencyId
        .toLowerCase()
        .trim(),
      evidence: evidenceUrl,
    });

    return await newComplaint.save();
  }

  async addComment(id: string, body: CreateCommentDto) {
    const complaint = await this.complaintModel.findById(id);
    if (!complaint) {
      throw new BadRequestException('Complaint not found');
    }
    const newComment = {
      userId: new Types.ObjectId(body.userId),
      username: body.username,
      role: body.role,
      from: body.role || 'Citizen',
      text: body.text,
      date: new Date(),
    };
    complaint.replies.push(newComment);
    await complaint.save();
    return newComment;
  }

  async findByCitizen(citizenId: string) {
    // Convert string to ObjectId
    const id = new Types.ObjectId(citizenId);

    return this.complaintModel
      .find({ citizenId: id }) // Match against the ObjectId
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
  // Replace your existing likeComplaint() and repostComplaint()
  // methods in complaints.service.ts with the following:

  async likeComplaint(id: string, userId: string) {
    const complaint = await this.complaintModel.findById(id);

    if (!complaint) {
      throw new Error('Complaint not found');
    }

    // Initialize likedBy if undefined
    if (!complaint.likedBy) {
      complaint.likedBy = [];
    }

    // Check whether this user already liked
    const alreadyLiked = complaint.likedBy.some(
      (likedUserId) => likedUserId.toString() === userId.toString(),
    );

    if (alreadyLiked) {
      return {
        success: false,
        message: 'You already liked this complaint',
        likes: complaint.likedBy.length,
        likedBy: complaint.likedBy,
      };
    }

    // Add user to likedBy
    complaint.likedBy.push(new Types.ObjectId(userId));

    // Update likes count
    complaint.likes = complaint.likedBy.length;

    const updatedComplaint = await complaint.save();

    return {
      success: true,
      message: 'Complaint liked successfully',
      likes: updatedComplaint.likes,
      likedBy: updatedComplaint.likedBy,
    };
  }

  async repostComplaint(id: string, userId: string) {
    const complaint = await this.complaintModel.findById(id);

    if (!complaint) {
      throw new Error('Complaint not found');
    }

    // Initialize repostedBy if undefined
    if (!complaint.repostedBy) {
      complaint.repostedBy = [];
    }

    // Check whether this user already reposted
    const alreadyReposted = complaint.repostedBy.some(
      (repostUserId) => repostUserId.toString() === userId.toString(),
    );

    if (alreadyReposted) {
      return {
        success: false,
        message: 'You already reposted this complaint',
        reposts: complaint.repostedBy.length,
        repostedBy: complaint.repostedBy,
      };
    }

    // Add user to repostedBy
    complaint.repostedBy.push(new Types.ObjectId(userId));

    // Update repost count
    complaint.reposts = complaint.repostedBy.length;

    const updatedComplaint = await complaint.save();

    return {
      success: true,
      message: 'Complaint reposted successfully',
      reposts: updatedComplaint.reposts,
      repostedBy: updatedComplaint.repostedBy,
    };
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
      { returnDocument: "after" },
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

  async updateStatus(
    id: string,
    status: string,
    comment?: string,
    rejectionReason?: string,
    rejectedBy?: any,
  ): Promise<Complaint | null> {

    const complaint =
      await this.complaintModel.findById(id);

    if (!complaint) {
      return null;
    }

    complaint.status = status;

    if (comment !== undefined) {
      complaint.comment = comment;
    }

    if (status === "Rejected") {
      complaint.rejectionReason =
        rejectionReason || "";

      complaint.rejectedByName =
        rejectedBy?.adminName || "";

      complaint.rejectedByRole =
        rejectedBy?.adminRole || "";
    }

    return complaint.save();
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
      { returnDocument: "after" },
    );
  }

  async getComplaintsForUser(user: any) {
    if (!user?.role) {
      throw new Error("Invalid JWT user payload");
    }

    switch (user.role) {
      case "admin":
        return this.getAllComplaints();

      case "mla":
        return this.getComplaintsByConstituency(user.constituencyId);

      case "employee":
        return this.getComplaintsByConstituency(user.constituencyId);

      default:
        return this.getPublicComplaints();
    }
  }
  async getAllComplaints() {
    return this.complaintModel.find().populate("citizenId", "name");
  }

  async getComplaintsByConstituency(constituencyId: string) {
    return this.complaintModel
      .find({ constituencyId: constituencyId?.toLowerCase().trim() })
      .populate("citizenId", "name");
  }


  async getForMla(user: any) {
    const constituency = (user.constituencyId || "")
      .toString()
      .trim()
      .toLowerCase();

    return this.complaintModel.find({
      constituencyId: {
        $regex: new RegExp(`^${constituency}$`, "i")
      }
    }).populate("citizenId", "name");
  }

  async getAdminAnalytics() {
    const total = await this.complaintModel.countDocuments();

    const statusBreakdown = await this.complaintModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const districtWise = await this.complaintModel.aggregate([
      {
        $group: {
          _id: "$district",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const constituencyWise = await this.complaintModel.aggregate([
      {
        $group: {
          _id: "$constituencyId",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const monthlyTrend = await this.complaintModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    const avgResolutionTime = await this.complaintModel.aggregate([
      {
        $match: {
          status: "Resolved",
          createdAt: { $exists: true },
          updatedAt: { $exists: true }
        }
      },
      {
        $project: {
          diffDays: {
            $divide: [
              { $subtract: ["$updatedAt", "$createdAt"] },
              1000 * 60 * 60 * 24
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          avgDays: { $avg: "$diffDays" }
        }
      }
    ]);

    return {
      total,
      statusBreakdown,
      districtWise,
      constituencyWise,
      monthlyTrend,
      avgResolutionTime: avgResolutionTime[0]?.avgDays || 0
    };
  }
}