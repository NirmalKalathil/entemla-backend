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
exports.ComplaintsController = void 0;
const common_1 = require("@nestjs/common");
const complaints_service_1 = require("./complaints.service");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const complaint_dto_1 = require("./dto/complaint.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ComplaintsController = class ComplaintsController {
    constructor(complaintsService) {
        this.complaintsService = complaintsService;
    }
    async create(dto) {
        return this.complaintsService.create(dto);
    }
    async getByCitizen(citizenId) {
        return await this.complaintsService.findByCitizen(citizenId);
    }
    getEmployeeComplaints(req) {
        return this.complaintsService.getComplaintsForUser(req.user);
    }
    async getAll() {
        return await this.complaintsService.findAll();
    }
    async getPublicComplaints() {
        return await this.complaintsService.getPublicComplaints();
    }
    async likeComplaint(id, userId) {
        return this.complaintsService.likeComplaint(id, userId);
    }
    async repostComplaint(id, userId) {
        return this.complaintsService.repostComplaint(id, userId);
    }
    async getStats() {
        return await this.complaintsService.getComplaintStats();
    }
    updateStatus(id, body) {
        return this.complaintsService.updateStatus(id, body.status, body.comment);
    }
    async addComment(id, body) {
        return this.complaintsService.addComment(id, body);
    }
    addReply(id, body) {
        return this.complaintsService.addReply(id, body.replyText, body.fromRole, body.username);
    }
    remove(id) {
        return this.complaintsService.remove(id);
    }
};
exports.ComplaintsController = ComplaintsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [complaint_dto_1.CreateComplaintDto]),
    __metadata("design:returntype", Promise)
], ComplaintsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('citizen/:citizenId'),
    __param(0, (0, common_1.Param)('citizenId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComplaintsController.prototype, "getByCitizen", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('employee'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ComplaintsController.prototype, "getEmployeeComplaints", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ComplaintsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('public'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ComplaintsController.prototype, "getPublicComplaints", null);
__decorate([
    (0, common_1.Patch)(':id/like'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ComplaintsController.prototype, "likeComplaint", null);
__decorate([
    (0, common_1.Patch)(':id/repost'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ComplaintsController.prototype, "repostComplaint", null);
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ComplaintsController.prototype, "getStats", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ComplaintsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)(':id/comment'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", Promise)
], ComplaintsController.prototype, "addComment", null);
__decorate([
    (0, common_1.Patch)(':id/reply'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ComplaintsController.prototype, "addReply", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComplaintsController.prototype, "remove", null);
exports.ComplaintsController = ComplaintsController = __decorate([
    (0, common_1.Controller)('complaints'),
    __metadata("design:paramtypes", [complaints_service_1.ComplaintsService])
], ComplaintsController);
//# sourceMappingURL=complaint.controller.js.map