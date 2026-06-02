import { AdminService } from "./admin.service";
import { AdminLoginDto } from "./dto/admin-login.dto";
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    login(dto: AdminLoginDto): Promise<{
        token: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            role: string;
        };
    }>;
    createEmployee(dto: any): Promise<import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../auth/schemas/user.schema").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    createMla(dto: any): Promise<import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../auth/schemas/user.schema").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getMlas(): Promise<(import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../auth/schemas/user.schema").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    updateMla(id: string, dto: any): Promise<(import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../auth/schemas/user.schema").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getMlaInfo(constituencyId: string): Promise<any>;
    deleteMla(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../auth/schemas/user.schema").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getEmployees(): Promise<(import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../auth/schemas/user.schema").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    updateEmployee(id: string, dto: any): Promise<(import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../auth/schemas/user.schema").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteEmployee(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../auth/schemas/user.schema").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    createCitizen(dto: any): Promise<import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../auth/schemas/user.schema").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getCitizens(): Promise<(import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../auth/schemas/user.schema").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    updateCitizen(id: string, dto: any): Promise<(import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../auth/schemas/user.schema").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteCitizen(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../auth/schemas/user.schema").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
