import { ComplaintsService } from './complaints.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateComplaintDto } from './dto/complaint.dto';
import { Complaint } from './schemas/complaint.schema';
export declare class ComplaintsController {
    private readonly complaintsService;
    constructor(complaintsService: ComplaintsService);
    create(dto: CreateComplaintDto, file?: Express.Multer.File): Promise<Complaint>;
    getPublicComplaints(): Promise<Complaint[]>;
    getStats(): Promise<{
        totalComplaints: number;
        resolvedComplaints: number;
        inProgressComplaints: number;
        avgResponse: string | number;
    }>;
    getMyComplaints(req: any): Promise<(import("mongoose").Document<unknown, {}, Complaint, {}, import("mongoose").DefaultSchemaOptions> & Complaint & {
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
    getMlaComplaints(req: any): Promise<(import("mongoose").Document<unknown, {}, Complaint, {}, import("mongoose").DefaultSchemaOptions> & Complaint & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getAdminComplaints(): Promise<(import("mongoose").Document<unknown, {}, Complaint, {}, import("mongoose").DefaultSchemaOptions> & Complaint & {
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
    getByCitizen(citizenId: string): Promise<(import("mongoose").Document<unknown, {}, Complaint, {}, import("mongoose").DefaultSchemaOptions> & Complaint & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
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
    updateStatus(id: string, body: any): Promise<Complaint | null>;
    addComment(id: string, body: CreateCommentDto): Promise<{
        userId: import("mongoose").Types.ObjectId;
        username: string;
        role: string;
        from: string;
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
    getAdminAnalytics(): Promise<{
        total: number;
        statusBreakdown: any[];
        districtWise: any[];
        constituencyWise: any[];
        monthlyTrend: any[];
        avgResolutionTime: any;
    }>;
}
