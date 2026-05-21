import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';

import { ComplaintsService } from './complaints.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateComplaintDto } from './dto/complaint.dto';
import { Complaint } from './schemas/complaint.schema';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) { }

  @Post()
  async create(@Body() dto: CreateComplaintDto): Promise<Complaint> {
    return this.complaintsService.create(dto);
  }

  @Get('citizen/:citizenId')
  async getByCitizen(@Param('citizenId') citizenId: string) {
    return await this.complaintsService.findByCitizen(citizenId);
  }

  // EMPLOYEE CONSTITUENCY FILTER
  @UseGuards(JwtAuthGuard)
  @Get('employee')
  getEmployeeComplaints(@Req() req: any) {
    return this.complaintsService.getComplaintsForUser(req.user);
  }

  @Get()
  async getAll() {
    return await this.complaintsService.findAll();
  }

  @Get('public')
  async getPublicComplaints() {
    return await this.complaintsService.getPublicComplaints();
  }

  @Patch(':id/like')
  async likeComplaint(
    @Param('id') id: string,
    @Body('userId') userId: string,
  ) {
    return this.complaintsService.likeComplaint(id, userId);
  }

  @Patch(':id/repost')
  async repostComplaint(
    @Param('id') id: string,
    @Body('userId') userId: string,
  ) {
    return this.complaintsService.repostComplaint(id, userId);
  }

  @Get('stats')
  async getStats() {
    return await this.complaintsService.getComplaintStats();
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.complaintsService.updateStatus(
      id,
      body.status,
      body.comment,
    );
  }

  @Post(':id/comment')
  async addComment(
    @Param('id') id: string,
    @Body() body: CreateCommentDto,
  ) {
    return this.complaintsService.addComment(id, body);
  }

  @Patch(':id/reply')
  addReply(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.complaintsService.addReply(
      id,
      body.replyText,
      body.fromRole,
      body.username,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.complaintsService.remove(id);
  }
}