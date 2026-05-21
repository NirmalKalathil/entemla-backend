import {
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('citizens')
  async getCitizens() {
    return this.usersService.getCitizens();
  }

  // ✅ Logged-in user profile
  @UseGuards(JwtAuthGuard)
  @Get('me/profile')
  async getMyProfile(@Req() req) {
    const user = await this.usersService.getUserById(req.user.id);

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    return user;
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }
}