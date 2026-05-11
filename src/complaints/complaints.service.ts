import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Complaint } from './schemas/complaint.schema';
import { CreateComplaintDto } from './dto/complaint.dto';

@Injectable()
export class ComplaintsService {
    constructor(
        @InjectModel(Complaint.name) private complaintModel: Model<Complaint>,
    ) { }

    // Save a new complaint to the database
    async create(createComplaintDto: CreateComplaintDto): Promise<Complaint> {
        const newComplaint = new this.complaintModel(createComplaintDto);
        return await newComplaint.save();
    }

    // Get all complaints for a specific citizen (used for the Citizen Dashboard)
    async findByCitizen(citizenId: string): Promise<Complaint[]> {
        return await this.complaintModel
            .find({ citizenId })
            .sort({ createdAt: -1 }) // Show newest first
            .exec();
    }

    // Get all complaints (used for the Employee Dashboard)
    async findAll(): Promise<Complaint[]> {
        return await this.complaintModel
            .find()
            .populate('citizenId', 'name') // 👈 This pulls the name from the User collection
            .sort({ createdAt: -1 })
            .exec();
    }

    async addReply(id: string, replyText: string, fromRole: string) {
        const newReply = {
            from: fromRole,
            text: replyText,
            date: new Date(),
        };

        return await this.complaintModel.findByIdAndUpdate(
            id,
            { $push: { replies: newReply } }, // $push adds to the array without overwriting
            { new: true } // returns the updated document
        );
    }

    // 1. Get all complaints with user names
    // async findAll() {
    //   return await this.complaintModel
    //     .find()
    //     .populate('citizenId', 'name') // Pulls the 'name' field from the Users collection
    //     .sort({ createdAt: -1 })
    //     .exec();
    // }

    // 2. Update status only
    async updateStatus(id: string, status: string) {
        return await this.complaintModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
    }
}