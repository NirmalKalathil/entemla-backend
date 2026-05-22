import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtConfigModule } from "./jwt.module";
import { JwtStrategy } from '../admin/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { EmployeeJwtStrategy } from './strategies/employee-jwt.strategy';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),],
    controllers: [AuthController],
    providers: [AuthService,JwtStrategy,EmployeeJwtStrategy],
    exports: [PassportModule, JwtStrategy, EmployeeJwtStrategy],
})
export class AuthModule { }
