import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { BannerService } from './banner.service';

@Controller('banner')
export class BannerController {

  constructor(
    private readonly bannerService: BannerService,
  ) {}

  @Post()
  create(
    @Body() createBannerDto: any,
  ) {
    return this.bannerService.create(
      createBannerDto,
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
  update(
    @Param('id') id: string,
    @Body() updateBannerDto: any,
  ) {
    return this.bannerService.update(
      id,
      updateBannerDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.bannerService.remove(id);
  }
}