import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ComplaintsModule } from './complaints/complaint.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module'; 
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),
    AuthModule,
    ComplaintsModule,
    UsersModule,
    ChatModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
