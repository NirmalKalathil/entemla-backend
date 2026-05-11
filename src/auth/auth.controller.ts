import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService:AuthService){}

    @Post('register')
    register(@Body(new ValidationPipe()) dto:RegisterDto){
        return this.authService.register(dto)
    }

    @Post('login')
    async login(@Body(new ValidationPipe()) dto:LoginDto){
        return this.authService.login(dto)
    }
}