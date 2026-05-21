"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const admin_controller_1 = require("./admin.controller");
const admin_service_1 = require("./admin.service");
const user_schema_1 = require("../auth/schemas/user.schema");
const jwt_strategy_1 = require("./jwt.strategy");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    secret: config.get('JWT_SECRET'),
                    signOptions: { expiresIn: '1d' },
                }),
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
        ],
        controllers: [admin_controller_1.AdminController],
        providers: [
            admin_service_1.AdminService,
            jwt_strategy_1.JwtStrategy,
        ],
        exports: [jwt_strategy_1.JwtStrategy, passport_1.PassportModule],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map