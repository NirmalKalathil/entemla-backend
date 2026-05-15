"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const mongoose_2 = require("mongoose");
let AuthService = class AuthService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async onModuleInit() {
        await this.seedMLA();
    }
    async seedMLA() {
        const mlaEmail = "mla.official@government.in";
        try {
            const existingMLA = await this.userModel.findOne({ email: mlaEmail });
            if (!existingMLA) {
                console.log('🚀 Seeding MLA details into database...');
                const mlaData = {
                    name: "Hon. MLA Name",
                    email: mlaEmail,
                    password: "qwerty123456",
                    phone: "9876543210",
                    district: "Ernakulam",
                    constituency: "Greenfield Constituency",
                    place: "Kochi",
                    role: "mla"
                };
                const mla = new this.userModel(mlaData);
                await mla.save();
                console.log('✅ MLA seeded successfully!');
            }
            else {
                console.log('✅ MLA already exists in database.');
            }
        }
        catch (error) {
            if (error.code === 11000) {
                console.log('✅ MLA already exists (duplicate key handled).');
            }
            else {
                console.error('❌ Error seeding MLA:', error.message);
            }
        }
    }
    async register(dto) {
        const existing = await this.userModel.findOne({ email: dto.email });
        if (existing) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const newUser = new this.userModel(dto);
        return newUser.save();
    }
    async login(loginDto) {
        const user = await this.userModel.findOne({ email: loginDto.email });
        if (!user || user.password !== loginDto.password) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        if (user.role !== loginDto.role) {
            throw new common_1.UnauthorizedException(`Access Denied: You are not registered as ${loginDto.role}`);
        }
        return {
            message: 'Login successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                district: user.district,
                constituency: user.constituency,
                place: user.place,
                role: user.role
            }
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map