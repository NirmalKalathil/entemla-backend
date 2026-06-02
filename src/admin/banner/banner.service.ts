import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Banner } from './banner.schema';

@Injectable()
export class BannerService {

  constructor(
    @InjectModel(Banner.name)
    private bannerModel: Model<Banner>,
  ) {}

  async create(createBannerDto: any) {
    const banner = new this.bannerModel(
      createBannerDto,
    );

    return banner.save();
  }

  async findAll() {
    return this.bannerModel.find().sort({
      createdAt: -1,
    });
  }

  async findActive() {
    return this.bannerModel.find({
      isActive: true,
    });
  }

  async update(
    id: string,
    updateBannerDto: any,
  ) {
    const banner =
      await this.bannerModel.findByIdAndUpdate(
        id,
        updateBannerDto,
        { new: true },
      );

    if (!banner) {
      throw new NotFoundException(
        'Banner not found',
      );
    }

    return banner;
  }

  async remove(id: string) {
    const banner =
      await this.bannerModel.findByIdAndDelete(
        id,
      );

    if (!banner) {
      throw new NotFoundException(
        'Banner not found',
      );
    }

    return {
      message:
        'Banner deleted successfully',
    };
  }
}