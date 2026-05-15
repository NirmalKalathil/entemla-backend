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
    getAll(): Promise<(import("mongoose").Document<unknown, {}, Complaint, {}, import("mongoose").DefaultSchemaOptions> & Complaint & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getPublicComplaints(): Promise<Complaint[]>;
    likeComplaint(id: string): Promise<Complaint | null>;
    repostComplaint(id: string): Promise<Complaint | null>;
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
    addReply(id: string, text: string, role: string, username: string): Promise<(import("mongoose").Document<unknown, {}, Complaint, {}, import("mongoose").DefaultSchemaOptions> & Complaint & {
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
