import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { InjectModel } from '@nestjs/mongoose';
import { EmployeeLoginDto } from './dto/employee_login.dto';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class EmployeeService {

    
}
