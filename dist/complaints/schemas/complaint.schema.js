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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintSchema = exports.Complaint = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Complaint = class Complaint {
};
exports.Complaint = Complaint;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Complaint.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Complaint.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['Normal', 'Medium', 'Urgent'],
        default: 'Normal',
    }),
    __metadata("design:type", String)
], Complaint.prototype, "urgency", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Complaint.prototype, "details", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Public' }),
    __metadata("design:type", String)
], Complaint.prototype, "visibility", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Pending' }),
    __metadata("design:type", String)
], Complaint.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Complaint.prototype, "citizenId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Complaint.prototype, "evidence", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Complaint.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Complaint.prototype, "likes", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose_2.Types.ObjectId],
        ref: 'User',
        default: [],
    }),
    __metadata("design:type", Array)
], Complaint.prototype, "likedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Complaint.prototype, "reposts", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose_2.Types.ObjectId],
        ref: 'User',
        default: [],
    }),
    __metadata("design:type", Array)
], Complaint.prototype, "repostedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Complaint.prototype, "views", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "" }),
    __metadata("design:type", String)
], Complaint.prototype, "comment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Complaint.prototype, "constituencyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                userId: {
                    type: mongoose_2.Types.ObjectId,
                    ref: 'User',
                },
                text: {
                    type: String,
                    required: true,
                },
                username: {
                    type: String,
                    required: true,
                },
                from: {
                    type: String,
                    default: 'Citizen',
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
                role: {
                    type: String,
                    enum: ['citizen', 'employee', 'mla'],
                    default: 'citizen',
                },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], Complaint.prototype, "replies", void 0);
exports.Complaint = Complaint = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Complaint);
exports.ComplaintSchema = mongoose_1.SchemaFactory.createForClass(Complaint);
//# sourceMappingURL=complaint.schema.js.map