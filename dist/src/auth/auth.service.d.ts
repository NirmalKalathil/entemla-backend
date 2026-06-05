import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import { RegisterDto } from "./dto/register.dto";
import { EmployeeLoginDto } from "./dto/employee_login.dto";
import { JwtService } from "@nestjs/jwt";
import { MlaLoginDto } from "./dto/mla_login.dto";
import { LoginDto } from "./dto/login.dto";
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    register(dto: RegisterDto): Promise<import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        token: string;
        user: {
            _id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            role: string;
            phone: string | null;
            district: string | null;
            place: string | null;
            constituencyId: string | null;
        };
    }>;
    employeeLogin(dto: EmployeeLoginDto): Promise<{
        message: string;
        user: {
            _id: import("mongoose").Types.ObjectId;
            name: string;
            employeeId: string | undefined;
            constituencyId: string;
            role: string;
        };
        token: string;
    }>;
    mlaLogin(dto: MlaLoginDto): Promise<{
        message: string;
        user: {
            _id: import("mongoose").Types.ObjectId;
            mlaId: string | undefined;
            name: string;
            constituencyId: string;
            role: string;
        };
        token: string;
    }>;
    getMyMla(constituencyId: string): Promise<{
        _id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
        phone: string;
        district: string;
        place: string;
        constituencyId: string;
        mlaId: string | undefined;
        photo: string;
        party: string;
    }>;
}
