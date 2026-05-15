import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ComplaintsModule } from './complaints/complaint.module';
import { UsersModule } from './users/users.module';
import { RagModule } from './rag/rag.module'; // 1. Added RagModule import


@Module({
  imports: [
    // Load the .env file
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    // Connect to MongoDB
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}