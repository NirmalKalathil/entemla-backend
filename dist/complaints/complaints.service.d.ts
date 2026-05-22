import { Model, Types } from 'mongoose';
import { Complaint } from './schemas/complaint.schema';
import { CreateComplaintDto } from './dto/complaint.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from '../auth/schemas/user.schema';
export declare class ComplaintsService {
    private complaintModel;
    private userModel;
    constructor(complaintModel: Model<Complaint>, userModel: Model<User>);
    create(createComplaintDto: CreateComplaintDto): Promise<import("mongoose").Document<unknown, {}, Complaint, {}, import("mongoose").DefaultSchemaOptions> & Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    addComment(id: string, body: CreateCommentDto): Promise<{
        userId: Types.ObjectId;
        username: string;
        role: string;
        from: string;
        text: string;
        date: Date;
    }>;
    findByCitizen(citizenId: string): Promise<(import("mongoose").Document<unknown, {}, Complaint, {}, import("mongoose").DefaultSchemaOptions> & Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Complaint, {}, import("mongoose").DefaultSchemaOptions> & Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getPublicComplaints(): Promise<Complaint[]>;
    likeComplaint(id: string, userId: string): Promise<{
        success: boolean;
        message: string;
        likes: number;
        likedBy: Types.ObjectId[];
    }>;
    repostComplaint(id: string, userId: string): Promise<{
        success: boolean;
        message: string;
        reposts: number;
        repostedBy: Types.ObjectId[];
    }>;
    addReply(id: string, replyText: string, fromRole: string, username: string): Promise<(import("mongoose").Document<unknown, {}, Complaint, {}, import("mongoose").DefaultSchemaOptions> & Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getComplaintStats(): Promise<{
        totalComplaints: number;
        resolvedComplaints: number;
        inProgressComplaints: number;
        avgResponse: string | number;
    }>;
    updateStatus(id: string, status: string, comment?: string): Promise<Complaint | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, Complaint, {}, import("mongoose").DefaultSchemaOptions> & Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    sendMessage(id: string, comment: string, username: string, role: string): Promise<(import("mongoose").Document<unknown, {}, Complaint, {}, import("mongoose").DefaultSchemaOptions> & Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getComplaintsForUser(user: any): Promise<Complaint[]>;
    getAllComplaints(): Promise<(import("mongoose").Document<unknown, {}, Complaint, {}, import("mongoose").DefaultSchemaOptions> & Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getComplaintsByConstituency(constituencyId: string): Promise<(import("mongoose").Document<unknown, {}, Complaint, {}, import("mongoose").DefaultSchemaOptions> & Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getForMla(user: any): Promise<(import("mongoose").Document<unknown, {}, Complaint, {}, import("mongoose").DefaultSchemaOptions> & Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
