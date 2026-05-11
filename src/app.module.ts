import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Complaint } from './complaints/schemas/complaint.schema';
import { ComplaintsModule } from './complaints/complaint.module';

@Module({
  imports: [
    // 1. Load the .env file
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    // 2. Connect to MongoDB using the URI from .env
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),

    // 3. Include your Auth logic
    AuthModule,
    ComplaintsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
