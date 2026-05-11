import { BadRequestException, Injectable, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService implements OnModuleInit {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async onModuleInit() {
        await this.seedMLA();
    }
    async seedMLA() {
    const mlaEmail = "mla.official@government.in"; // Your fixed MLA email
    const existingMLA = await this.userModel.findOne({ email: mlaEmail });

    if (!existingMLA) {
      console.log('🚀 Seeding MLA details into database...');
      const mlaData = {
        name: "Hon. MLA Name",
        email: "mla@gmail.com",
        password: "qwerty123456", // In production, use bcrypt to hash this!
        phone: "9876543210",
        place: "Greenfield Constituency",
        role: "mla"
      };

      const mla = new this.userModel(mlaData);
      await mla.save();
      console.log('✅ MLA details successfully hardcoded.');
    }
  }
    async register(dto: RegisterDto) {
        const existing = await this.userModel.findOne({ email: dto.email })
        if (existing) {
            throw new BadRequestException('Email already Exist')
        } else {
            const newUser = new this.userModel(dto)
            return newUser.save()
        }
    }
    async login(loginDto: any) {
        const { email, password, role } = loginDto
        const user = await this.userModel.findOne({ email: loginDto.email })

        if (!user || user.password !== loginDto.password) {
            throw new UnauthorizedException('Invalid email or password')
        }
        if (user.role !== role) {
            throw new UnauthorizedException(`Access Denied: You are not registered as an ${role}`);
        }
        return {
            message: 'Login successful',
            user: {
                _id:user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                place: user.place, // Make sure this matches your schema
                role: user.role
            }
        }
    }
}