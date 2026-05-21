import * as bcrypt from "bcrypt";
import { Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../auth/schemas/user.schema";
import { AdminLoginDto } from "./dto/admin-login.dto";
import { JwtService } from "@nestjs/jwt";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { CreateMlaDto } from "./dto/create-mla.dto";

@Injectable()
export class AdminService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) { }

  async login(dto: AdminLoginDto) {
    console.log(dto);

    const user = await this.userModel.findOne({
      email: dto.email,
      role: "admin"
    });
    console.log(user);

    if (!user) {
      throw new UnauthorizedException(
        "Invalid email"
      );
    }

    const isMatch = await bcrypt.compare(
      dto.password,
      user.password
    );

    if (!isMatch) {
      throw new UnauthorizedException(
        "Invalid password"
      );
    }

    if (user.role !== "admin") {
      throw new UnauthorizedException(
        "Access denied"
      );
    }

    const token = this.jwtService.sign({
      id: user._id,
      role: user.role,
      email: user?.email
    });

    return {
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user?.email,
        role: user.role
      },

    };

  }

  // 🔥 CREATE EMPLOYEE
  async createEmployee(dto: CreateEmployeeDto) {

    const exists = await this.userModel.findOne({
      email: dto.email
    });

    if (exists) {
      throw new BadRequestException(
        "Employee already exists"
      );
    }

    const employeeExists =
      await this.userModel.findOne({
        employeeId: dto.employeeId
      });

    if (employeeExists) {
      throw new BadRequestException(
        "Employee ID already exists"
      );
    }

    const hashedPassword =
      await bcrypt.hash(dto.password, 10);

    const employee = new this.userModel({
      ...dto,
      password: hashedPassword,
      role: "employee",
      mustChangePassword: true
    });

    return employee.save();
  }

  // 🔥 CREATE MLA
  async createMla(dto: CreateMlaDto) {

    const exists = await this.userModel.findOne({
      email: dto.email
    });

    if (exists) {
      throw new BadRequestException(
        "MLA already exists"
      );
    }

    const hashedPassword = await bcrypt.hash(
      dto.password,
      10
    );

    const mla = new this.userModel({
      ...dto,
      password: hashedPassword,
      role: "mla",
    });

    return mla.save();
  }
  async getMlas() {
    return this.userModel.find({ role: "mla" });
  }

  async updateMla(id: string, dto: any) {
    return this.userModel.findByIdAndUpdate(
      id,
      dto,
      { new: true }
    );
  }

  async deleteMla(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async getEmployees() {
    return this.userModel.find({
      role: "employee"
    });
  }

  async updateEmployee(id: string, dto: any) {

    return this.userModel.findByIdAndUpdate(
      id,
      dto,
      { new: true }
    );
  }

  async deleteEmployee(id: string) {

    return this.userModel.findByIdAndDelete(id);
  }
}