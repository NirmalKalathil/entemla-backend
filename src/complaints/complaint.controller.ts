import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/complaint.dto';

@Controller('complaints')
export class ComplaintsController {
    constructor(private readonly complaintsService: ComplaintsService) { }

    // POST /complaints
    @Post()
    async create(@Body() createComplaintDto: CreateComplaintDto) {
        return await this.complaintsService.create(createComplaintDto);
    }

    // GET /complaints/citizen/:citizenId
    @Get('citizen/:citizenId')
    async getByCitizen(@Param('citizenId') citizenId: string) {
        return await this.complaintsService.findByCitizen(citizenId);
    }

    // GET /complaints (For Employee Dashboard)
    @Get()
    async getAll() {
        return await this.complaintsService.findAll();
    }

    @Patch(':id/reply')
    async addReply(
        @Param('id') id: string,
        @Body('text') text: string,
        @Body('from') from: string,
    ) {
        return await this.complaintsService.addReply(id, text, from);
    }
}