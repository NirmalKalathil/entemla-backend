import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { BannerService } from './banner.service';

@Controller('banner')
export class BannerController {
  constructor(
    private readonly bannerService: BannerService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createBannerDto: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.bannerService.create(
      createBannerDto,
      file,
    );
  }

  @Get()
  findAll() {
    return this.bannerService.findAll();
  }

  @Get('active')
  findActive() {
    return this.bannerService.findActive();
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateBannerDto: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.bannerService.update(
      id,
      updateBannerDto,
      file,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.bannerService.remove(id);
  }
}