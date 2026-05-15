import { OnModuleInit } from "@nestjs/common";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import { RegisterDto } from "./dto/register.dto";
export declare class AuthService implements OnModuleInit {
    private userModel;
    constructor(userModel: Model<User>);
    onModuleInit(): Promise<void>;
    seedMLA(): Promise<void>;
    register(dto: RegisterDto): Promise<import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    login(loginDto: any): Promise<{
        message: string;
        user: {
            _id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            phone: string;
            district: string;
            constituency: string;
            place: string;
            role: string;
        };
    }>;
}
