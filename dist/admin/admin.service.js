"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const bcrypt = __importStar(require("bcrypt"));
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../auth/schemas/user.schema");
const jwt_1 = require("@nestjs/jwt");
let AdminService = class AdminService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async login(dto) {
        console.log(dto);
        const user = await this.userModel.findOne({
            email: dto.email,
            role: "admin"
        });
        console.log(user);
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid email");
        }
        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException("Invalid password");
        }
        if (user.role !== "admin") {
            throw new common_1.UnauthorizedException("Access denied");
        }
        const token = this.jwtService.sign({
            id: user._id,
            role: user.role,
            email: user?.email
        });
        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user?.email,
                role: user.role
            },
        };
    }
    async createEmployee(dto) {
        const exists = await this.userModel.findOne({
            email: dto.email
        });
        if (exists) {
            throw new common_1.BadRequestException("Employee already exists");
        }
        const employeeExists = await this.userModel.findOne({
            employeeId: dto.employeeId
        });
        if (employeeExists) {
            throw new common_1.BadRequestException("Employee ID already exists");
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const employee = new this.userModel({
            ...dto,
            password: hashedPassword,
            role: "employee",
            mustChangePassword: true
        });
        return employee.save();
    }
    async createMla(dto) {
        const exists = await this.userModel.findOne({
            email: dto.email
        });
        if (exists) {
            throw new common_1.BadRequestException("MLA already exists");
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const mla = new this.userModel({
            ...dto,
            password: hashedPassword,
            role: "mla",
        });
        return mla.save();
    }
    async getMlas() {
        return this.userModel.find({ role: "mla" });
    }
    async updateMla(id, dto) {
        return this.userModel.findByIdAndUpdate(id, dto, { new: true });
    }
    async deleteMla(id) {
        return this.userModel.findByIdAndDelete(id);
    }
    async getEmployees() {
        return this.userModel.find({
            role: "employee"
        });
    }
    async updateEmployee(id, dto) {
        return this.userModel.findByIdAndUpdate(id, dto, { new: true });
    }
    async deleteEmployee(id) {
        return this.userModel.findByIdAndDelete(id);
    }
    async createCitizen(dto) {
        const existing = await this.userModel.findOne({
            email: dto.email,
        });
        if (existing) {
            throw new common_1.BadRequestException("Citizen already exists");
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const citizen = await this.userModel.create({
            ...dto,
            password: hashedPassword,
            role: "citizen",
            isActive: true,
        });
        return citizen;
    }
    async getCitizens() {
        return this.userModel.find({
            role: "citizen",
        });
    }
    async updateCitizen(id, dto) {
        const updateData = { ...dto };
        if (dto.password) {
            updateData.password = await bcrypt.hash(dto.password, 10);
        }
        else {
            delete updateData.password;
        }
        return this.userModel.findByIdAndUpdate(id, updateData, { new: true });
    }
    async deleteCitizen(id) {
        return this.userModel.findByIdAndDelete(id);
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, jwt_1.JwtService])
], AdminService);
//# sourceMappingURL=admin.service.js.map