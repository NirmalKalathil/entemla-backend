import { BadRequestException, Injectable, NotFoundException, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import { RegisterDto } from "./dto/register.dto";
import axios from "axios";
import * as cheerio from "cheerio";
import * as bcrypt from "bcrypt";
import { EmployeeLoginDto } from "./dto/employee_login.dto";
import { JwtService } from "@nestjs/jwt";
import { MlaLoginDto } from "./dto/mla_login.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,

        private jwtService: JwtService
    ) { }



    // --- AUTHENTICATION METHODS (Fixes your TS2339 Compiler Errors) ---
    async register(dto: RegisterDto) {
        const existing = await this.userModel.findOne({ email: dto.email });

        if (existing) {
            throw new BadRequestException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const newUser = new this.userModel({
            ...dto,
            password: hashedPassword,
            role: "citizen" // 🔒 force citizen only
        });

        return newUser.save();
    }

    async login(loginDto: LoginDto) {
        const user = await this.userModel.findOne({
            email: loginDto.email,
        });

        if (!user) {
            throw new UnauthorizedException(
                "Invalid email or password",
            );
        }

        const isMatch = await bcrypt.compare(
            loginDto.password,
            user.password,
        );

        if (!isMatch) {
            throw new UnauthorizedException(
                "Invalid email or password",
            );
        }

        // ✅ JWT payload
        const payload = {
            id: user._id,
            role: user.role,
            constituencyId: user.constituencyId || null,
        };

        const token = this.jwtService.sign(payload);

        // ✅ Return complete frontend-safe user object
        return {
            message: "Login successful",
            token,

            user: {
                _id: user._id,
                name: user.name,
                email: user?.email,
                role: user.role,
                phone: user.phone || null,
                district: user.district || null,
                place: user.place || null,
                constituencyId: user.constituencyId || null,
            },
        };
    }
    async employeeLogin(dto: EmployeeLoginDto) {


        const user = await this.userModel.findOne({
            employeeId: dto.employeeId
        });

        if (!user || !user.password) {
            throw new UnauthorizedException("Invalid employee ID");
        }

        if (user.role !== "employee") {
            throw new UnauthorizedException("Access denied");
        }

        const isMatch = await bcrypt.compare(dto.password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException("Invalid password");
        }

        const token = this.jwtService.sign({
            id: user._id,
            role: user.role,
            employeeId: user.employeeId,
            constituencyId: user.constituencyId || null,
        });


        return {
            message: "Employee login successful",

            user: {
                _id: user._id,
                employeeId: user.employeeId,
                constituencyId: user.constituencyId,
                role: user.role,
            }, token: token
        };
    }
    async mlaLogin(dto: MlaLoginDto) {

        const user = await this.userModel.findOne({
            mlaId: dto.mlaId
        });

        if (!user || !user.password) {
            throw new UnauthorizedException("Invalid MLA ID");
        }

        if (user.role !== "mla") {
            throw new UnauthorizedException("Access denied");
        }

        const isMatch = await bcrypt.compare(
            dto.password,
            user.password
        );

        if (!isMatch) {
            throw new UnauthorizedException("Invalid password");
        }

        const token = this.jwtService.sign({
            id: user._id,
            role: user.role,
            mlaId: user.mlaId,
            constituencyId: user.constituencyId,
        });

        return {
            message: "MLA login successful",

            user: {
                _id: user._id,
                mlaId: user.mlaId,
                name: user.name,
                constituencyId: user.constituencyId,
                role: user.role,
            },

            token,
        };
    }
    async getMyMla(
        constituencyId: string,
    ) {

        const mla = await this.userModel.findOne({
            role: 'mla',
            constituencyId,
            isActive: true,
        });

        if (!mla) {
            throw new NotFoundException(
                'MLA not found'
            );
        }

        return {
            _id: mla._id,
            name: mla.name,
            email: mla.email,
            phone: mla.phone,
            district: mla.district,
            place: mla.place,
            constituencyId: mla.constituencyId,
            mlaId: mla.mlaId,
            photo: mla.photo,
            party: mla.party,
        };
    }
}