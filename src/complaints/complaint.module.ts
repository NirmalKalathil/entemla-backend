import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComplaintsController } from './complaint.controller';
import { ComplaintsService } from './complaints.service';
import { Complaint, ComplaintSchema } from './schemas/complaint.schema';
import { User, UserSchema } from '../auth/schemas/user.schema';
import { AuthModule } from '../auth/auth.module';
import { S3Module } from '../../s3/s3.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Complaint.name, schema: ComplaintSchema },
      { name: User.name, schema: UserSchema }, 
    ]),
    AuthModule,
    S3Module,
  ],
  controllers: [ComplaintsController],
  providers: [ComplaintsService],
})
export class ComplaintsModule {}