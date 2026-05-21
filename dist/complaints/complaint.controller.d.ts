import { ComplaintsService } from './complaints.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateComplaintDto } from './dto/complaint.dto';
import { Complaint } from './schemas/complaint.schema';
export declare class ComplaintsController {
    private readonly complaintsService;
    constructor(complaintsService: ComplaintsService);
    create(dto: CreateComplaintDto): Promise<Complaint>;
    getByCitizen(citizenId: string): Promise<(import("mongoose").Document<unknown, {}, Complaint, {}, import("mongoose").DefaultSchemaOptions> & Complaint & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getEmployeeComplaints(req: any): Promise<(import("mongoose").Document<unknown, {}, Complaint, {}, import("mongoose").DefaultSchemaOptions> & Complaint & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getAll(): Promise<(import("mongoose").Document<unknown, {}, Complaint, {}, import("mongoose").DefaultSchemaOptions> & Complaint & {
        _id: import("mongoose").Types.ObjectId;
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
        likedBy: import("mongoose").Types.ObjectId[];
    }>;
    repostComplaint(id: string, userId: string): Promise<{
        success: boolean;
        message: string;
        reposts: number;
        repostedBy: import("mongoose").Types.ObjectId[];
    }>;
    getStats(): Promise<{
        totalComplaints: number;
        resolvedComplaints: number;
        inProgressComplaints: number;
        avgResponse: string | number;
    }>;
    updateStatus(id: string, body: any): Promise<Complaint | null>;
    addComment(id: string, body: CreateCommentDto): Promise<{
        userId: import("mongoose").Types.ObjectId;
        username: string;
        role: string;
        text: string;
        date: Date;
    }>;
    addReply(id: string, body: any): Promise<(import("mongoose").Document<unknown, {}, Complaint, {}, import("mongoose").DefaultSchemaOptions> & Complaint & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, Complaint, {}, import("mongoose").DefaultSchemaOptions> & Complaint & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
