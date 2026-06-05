import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { EmployeeLoginDto } from "./dto/employee_login.dto";
import { MlaLoginDto } from "./dto/mla_login.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/user.schema").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    login(dto: LoginDto): Promise<{
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
    getMyMla(req: any): Promise<{
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
