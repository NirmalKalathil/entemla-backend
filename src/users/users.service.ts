import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) { }

  async getAllUsers() {
    return this.userModel.find();
  }

  async getCitizens() {
    return this.userModel.find({ role: 'citizen' });
  }

  async getUserById(id: string) {
    return this.userModel.findById(id);
  }

  async getMyProfile(id: string) {
  return await this.userModel.findById(id);
}
}