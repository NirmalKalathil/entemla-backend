import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
    ValidationPipe
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { EmployeeLoginDto } from "./dto/employee_login.dto";
import { MlaLoginDto } from "./dto/mla_login.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { EmployeeJwtStrategy } from "./strategies/employee-jwt.strategy";
import { EmployeeJwtGuard } from "./guards/employee-jwt.guard";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    register(
        @Body(new ValidationPipe())
        dto: RegisterDto
    ) {
        return this.authService.register(dto);
    }

    @Post('login')
    login(
        @Body(new ValidationPipe())
        dto: LoginDto
    ) {
        return this.authService.login(dto);
    }

    @Post('employee/login')
    employeeLogin(
        @Body(new ValidationPipe())
        dto: EmployeeLoginDto
    ) {
        return this.authService.employeeLogin(dto);
    }

    @Post('mla/login')
    mlaLogin(
        @Body(new ValidationPipe())
        dto: MlaLoginDto
    ) {
        return this.authService.mlaLogin(dto);
    }

    @Get('my-mla')
    @UseGuards(EmployeeJwtGuard)
    getMyMla(@Req() req) {
        return this.authService.getMyMla(
            req.user.constituencyId,
        );
    }
}