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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const existing = await this.userModel.findOne({ email: dto.email });
        if (existing) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const newUser = new this.userModel({
            ...dto,
            password: hashedPassword,
            role: "citizen"
        });
        return newUser.save();
    }
    async login(loginDto) {
        const user = await this.userModel.findOne({
            email: loginDto.email,
        });
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid email or password");
        }
        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException("Invalid email or password");
        }
        const payload = {
            id: user._id,
            role: user.role,
            constituencyId: user.constituencyId || null,
        };
        const token = this.jwtService.sign(payload);
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
    async employeeLogin(dto) {
        const user = await this.userModel.findOne({
            employeeId: dto.employeeId
        });
        if (!user || !user.password) {
            throw new common_1.UnauthorizedException("Invalid employee ID");
        }
        if (user.role !== "employee") {
            throw new common_1.UnauthorizedException("Access denied");
        }
        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException("Invalid password");
        }
        const token = this.jwtService.sign({
            id: user._id,
            name: user.name,
            role: user.role,
            employeeId: user.employeeId,
            constituencyId: user.constituencyId || null,
        });
        return {
            message: "Employee login successful",
            user: {
                _id: user._id,
                name: user.name,
                employeeId: user.employeeId,
                constituencyId: user.constituencyId,
                role: user.role,
            }, token: token
        };
    }
    async mlaLogin(dto) {
        const user = await this.userModel.findOne({
            mlaId: dto.mlaId
        });
        if (!user || !user.password) {
            throw new common_1.UnauthorizedException("Invalid MLA ID");
        }
        if (user.role !== "mla") {
            throw new common_1.UnauthorizedException("Access denied");
        }
        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException("Invalid password");
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
    async getMyMla(constituencyId) {
        const mla = await this.userModel.findOne({
            role: 'mla',
            constituencyId,
            isActive: true,
        });
        if (!mla) {
            throw new common_1.NotFoundException('MLA not found');
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map