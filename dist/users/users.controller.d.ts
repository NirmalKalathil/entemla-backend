import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(): Promise<(import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../auth/schemas/user.schema").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getCitizens(): Promise<(import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../auth/schemas/user.schema").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getMyProfile(req: any): Promise<(import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../auth/schemas/user.schema").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | {
        message: string;
    }>;
    getUserById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../auth/schemas/user.schema").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
