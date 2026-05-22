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
import { EmployeeJwtGuard } from '../auth/guards/employee-jwt.guard';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) { }

  // --- POST ROUTES ---

  @Post()
  async create(@Body() dto: CreateComplaintDto): Promise<Complaint> {
    return this.complaintsService.create(dto);
  }

  // --- GET ROUTES (STATIC FIRST) ---

  @Get('public')
  async getPublicComplaints() {
    return await this.complaintsService.getPublicComplaints();
  }

  @Get('stats')
  async getStats() {
    return await this.complaintsService.getComplaintStats();
  }

  @UseGuards(JwtAuthGuard) // Use standard citizen guard, NOT EmployeeJwtGuard
  @Get('my-complaints')
  async getMyComplaints(@Req() req: any) {
    // Assuming your standard JwtStrategy puts the user ID in 'sub' or 'id'
    const userId = req.user.id || req.user.sub;
    console.log("Searching for Citizen ID:", userId);
    return this.complaintsService.findByCitizen(userId);
  }

  @UseGuards(EmployeeJwtGuard)
  @Get('employee')
  getEmployeeComplaints(@Req() req: any) {
    console.log('--- EMPLOYEE STRATEGY ACTIVE ---', req.user);
    return this.complaintsService.getComplaintsByConstituency(
      req.user?.constituencyId || '',
    );
  }

  @UseGuards(EmployeeJwtGuard)
  @Get('mla')
  getMlaComplaints(@Req() req: any) {
    return this.complaintsService.getComplaintsByConstituency(
      req.user?.constituencyId || '',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin')
  getAdminComplaints() {
    return this.complaintsService.getAllComplaints();
  }

  @UseGuards(EmployeeJwtGuard)
  @Get()
  async getAll() {
    return await this.complaintsService.findAll();
  }

  // --- GET ROUTES (DYNAMIC / PARAMETERS LAST) ---

  @Get('citizen/:citizenId')
  async getByCitizen(@Param('citizenId') citizenId: string) {
    return await this.complaintsService.findByCitizen(citizenId);
  }

  // --- PATCH & POST INTERACTION ROUTES ---

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

  // --- DELETE ROUTES ---

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.complaintsService.remove(id);
  }
}