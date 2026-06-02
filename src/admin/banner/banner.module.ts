import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Banner, BannerSchema } from './banner.schema';

@Module({
    imports: [
    MongooseModule.forFeature([
      {
        name: Banner.name,
        schema: BannerSchema,
      },
    ]),
  ],
  providers: [BannerService],
  controllers: [BannerController]
})
export class BannerModule {}
