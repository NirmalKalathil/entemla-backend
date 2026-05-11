import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComplaintsController } from './complaint.controller';
import { ComplaintsService } from './complaints.service';
import { Complaint, ComplaintSchema } from './schemas/complaint.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Complaint.name, schema: ComplaintSchema }]),
  ],
  controllers: [ComplaintsController],
  providers: [ComplaintsService],
})
export class ComplaintsModule {}