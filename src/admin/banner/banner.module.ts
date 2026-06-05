import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Banner, BannerSchema } from './banner.schema';
import { S3Module } from '../../../s3/s3.module';

@Module({
    imports: [
    MongooseModule.forFeature([
      {
        name: Banner.name,
        schema: BannerSchema,
      },
    ]),
    S3Module,
  ],
  providers: [BannerService],
  controllers: [BannerController]
})
export class BannerModule {}
