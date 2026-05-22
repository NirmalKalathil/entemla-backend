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
exports.ComplaintsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const complaint_schema_1 = require("./schemas/complaint.schema");
const user_schema_1 = require("../auth/schemas/user.schema");
let ComplaintsService = class ComplaintsService {
    constructor(complaintModel, userModel) {
        this.complaintModel = complaintModel;
        this.userModel = userModel;
    }
    async create(createComplaintDto) {
        const citizen = await this.userModel.findById(createComplaintDto.citizenId);
        if (!citizen) {
            throw new common_1.BadRequestException("Invalid citizen ID");
        }
        if (!citizen.constituencyId) {
            throw new common_1.BadRequestException("Citizen missing constituencyId");
        }
        const newComplaint = new this.complaintModel({
            ...createComplaintDto,
            citizenId: citizen._id,
            constituencyId: citizen.constituencyId.toLowerCase().trim(),
        });
        return await newComplaint.save();
    }
    async addComment(id, body) {
        const complaint = await this.complaintModel.findById(id);
        if (!complaint) {
            throw new common_1.BadRequestException('Complaint not found');
        }
        const newComment = {
            userId: new mongoose_2.Types.ObjectId(body.userId),
            username: body.username,
            role: body.role,
            from: body.role || 'Citizen',
            text: body.text,
            date: new Date(),
        };
        complaint.replies.push(newComment);
        await complaint.save();
        return newComment;
    }
    async findByCitizen(citizenId) {
        const id = new mongoose_2.Types.ObjectId(citizenId);
        return this.complaintModel
            .find({ citizenId: id })
            .populate('citizenId', 'name email')
            .exec();
    }
    async findAll() {
        return this.complaintModel
            .find()
            .populate('citizenId', 'name email')
            .exec();
    }
    async getPublicComplaints() {
        return await this.complaintModel
            .find({ visibility: 'Public' })
            .populate('citizenId', 'name')
            .sort({ createdAt: -1 })
            .exec();
    }
    async likeComplaint(id, userId) {
        const complaint = await this.complaintModel.findById(id);
        if (!complaint) {
            throw new Error('Complaint not found');
        }
        if (!complaint.likedBy) {
            complaint.likedBy = [];
        }
        const alreadyLiked = complaint.likedBy.some((likedUserId) => likedUserId.toString() === userId.toString());
        if (alreadyLiked) {
            return {
                success: false,
                message: 'You already liked this complaint',
                likes: complaint.likedBy.length,
                likedBy: complaint.likedBy,
            };
        }
        complaint.likedBy.push(new mongoose_2.Types.ObjectId(userId));
        complaint.likes = complaint.likedBy.length;
        const updatedComplaint = await complaint.save();
        return {
            success: true,
            message: 'Complaint liked successfully',
            likes: updatedComplaint.likes,
            likedBy: updatedComplaint.likedBy,
        };
    }
    async repostComplaint(id, userId) {
        const complaint = await this.complaintModel.findById(id);
        if (!complaint) {
            throw new Error('Complaint not found');
        }
        if (!complaint.repostedBy) {
            complaint.repostedBy = [];
        }
        const alreadyReposted = complaint.repostedBy.some((repostUserId) => repostUserId.toString() === userId.toString());
        if (alreadyReposted) {
            return {
                success: false,
                message: 'You already reposted this complaint',
                reposts: complaint.repostedBy.length,
                repostedBy: complaint.repostedBy,
            };
        }
        complaint.repostedBy.push(new mongoose_2.Types.ObjectId(userId));
        complaint.reposts = complaint.repostedBy.length;
        const updatedComplaint = await complaint.save();
        return {
            success: true,
            message: 'Complaint reposted successfully',
            reposts: updatedComplaint.reposts,
            repostedBy: updatedComplaint.repostedBy,
        };
    }
    async addReply(id, replyText, fromRole, username) {
        const normalizedRole = (fromRole || 'citizen').toLowerCase();
        const fromLabel = normalizedRole === 'employee' ? 'Employee' :
            normalizedRole === 'mla' ? 'MLA' :
                'Citizen';
        const newReply = {
            text: replyText,
            username,
            from: fromLabel,
            role: normalizedRole,
            createdAt: new Date(),
        };
        return this.complaintModel.findByIdAndUpdate(id, { $push: { replies: newReply } }, { returnDocument: "after" });
    }
    async getComplaintStats() {
        const totalComplaints = await this.complaintModel.countDocuments();
        const resolvedComplaints = await this.complaintModel.countDocuments({ status: 'Resolved' });
        const inProgressComplaints = await this.complaintModel.countDocuments({ status: 'In Progress' });
        const complaints = await this.complaintModel.find();
        let totalDays = 0;
        complaints.forEach((complaint) => {
            if (complaint.createdAt && complaint.updatedAt) {
                const diffTime = new Date(complaint.updatedAt).getTime() - new Date(complaint.createdAt).getTime();
                totalDays += diffTime / (1000 * 60 * 60 * 24);
            }
        });
        const avgResponse = complaints.length > 0
            ? (totalDays / complaints.length).toFixed(1)
            : 0;
        return { totalComplaints, resolvedComplaints, inProgressComplaints, avgResponse };
    }
    async updateStatus(id, status, comment) {
        return this.complaintModel.findByIdAndUpdate(id, { status, comment }, { returnDocument: "after" });
    }
    async remove(id) {
        return this.complaintModel.findByIdAndDelete(id);
    }
    async sendMessage(id, comment, username, role) {
        const fromLabel = role === 'employee' ? 'Employee' :
            role === 'mla' ? 'MLA' :
                'Citizen';
        return this.complaintModel.findByIdAndUpdate(id, {
            $push: {
                replies: {
                    text: comment,
                    username,
                    from: fromLabel,
                    role: role,
                    createdAt: new Date(),
                },
            },
        }, { returnDocument: "after" });
    }
    async getComplaintsForUser(user) {
        if (!user?.role) {
            throw new Error("Invalid JWT user payload");
        }
        switch (user.role) {
            case "admin":
                return this.getAllComplaints();
            case "mla":
                return this.getComplaintsByConstituency(user.constituencyId);
            case "employee":
                return this.getComplaintsByConstituency(user.constituencyId);
            default:
                return this.getPublicComplaints();
        }
    }
    async getAllComplaints() {
        return this.complaintModel.find().populate("citizenId", "name");
    }
    async getComplaintsByConstituency(constituencyId) {
        return this.complaintModel
            .find({ constituencyId: constituencyId?.toLowerCase().trim() })
            .populate("citizenId", "name");
    }
    async getForMla(user) {
        const constituency = (user.constituencyId || "")
            .toString()
            .trim()
            .toLowerCase();
        return this.complaintModel.find({
            constituencyId: {
                $regex: new RegExp(`^${constituency}$`, "i")
            }
        }).populate("citizenId", "name");
    }
};
exports.ComplaintsService = ComplaintsService;
exports.ComplaintsService = ComplaintsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(complaint_schema_1.Complaint.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ComplaintsService);
//# sourceMappingURL=complaints.service.js.map