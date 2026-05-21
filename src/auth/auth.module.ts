import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtConfigModule } from "./jwt.module";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtConfigModule,],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }
