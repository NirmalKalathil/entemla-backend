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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const common_2 = require("@nestjs/common");
const roles_decarators_1 = require("../common/decarators/roles.decarators");
const roles_guard_1 = require("../common/guards/roles.guard");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const admin_login_dto_1 = require("./dto/admin-login.dto");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    login(dto) {
        return this.adminService.login(dto);
    }
    createEmployee(dto) {
        return this.adminService.createEmployee(dto);
    }
    createMla(dto) {
        console.log(dto);
        return this.adminService.createMla(dto);
    }
    getMlas() {
        return this.adminService.getMlas();
    }
    updateMla(id, dto) {
        return this.adminService.updateMla(id, dto);
    }
    deleteMla(id) {
        return this.adminService.deleteMla(id);
    }
    getEmployees() {
        return this.adminService.getEmployees();
    }
    updateEmployee(id, dto) {
        return this.adminService.updateEmployee(id, dto);
    }
    deleteEmployee(id) {
        return this.adminService.deleteEmployee(id);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_login_dto_1.AdminLoginDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "login", null);
__decorate([
    (0, roles_decarators_1.Roles)("admin"),
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)("create-employee"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createEmployee", null);
__decorate([
    (0, roles_decarators_1.Roles)("admin"),
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)("create-mla"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createMla", null);
__decorate([
    (0, roles_decarators_1.Roles)("admin"),
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)("mlas"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getMlas", null);
__decorate([
    (0, roles_decarators_1.Roles)("admin"),
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)("mla/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateMla", null);
__decorate([
    (0, roles_decarators_1.Roles)("admin"),
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)("mla/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteMla", null);
__decorate([
    (0, roles_decarators_1.Roles)("admin"),
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)("employees"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getEmployees", null);
__decorate([
    (0, roles_decarators_1.Roles)("admin"),
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)("employee/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateEmployee", null);
__decorate([
    (0, roles_decarators_1.Roles)("admin"),
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)("employee/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteEmployee", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)("admin"),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map