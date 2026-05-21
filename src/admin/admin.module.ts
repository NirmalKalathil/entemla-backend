import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

import { User, UserSchema } from '../auth/schemas/user.schema';

import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),

    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],

  controllers: [AdminController],

  providers: [
    AdminService,
    JwtStrategy,
  ],

  exports: [JwtStrategy, PassportModule],
})
export class AdminModule {}