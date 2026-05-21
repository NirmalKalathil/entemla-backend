import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { ComplaintsModule } from './complaints/complaint.module';
import { UsersModule } from './users/users.module';
import { RagModule } from './rag/rag.module';

import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),

    AuthModule,
    ComplaintsModule,
    RagModule,
    UsersModule,
    AdminModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}