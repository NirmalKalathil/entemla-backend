import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Banner } from './banner.schema';
import { S3Service } from '../../../s3/s3.service';

@Injectable()
export class BannerService {
  constructor(
    @InjectModel(Banner.name)
    private bannerModel: Model<Banner>,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    createBannerDto: any,
    file?: Express.Multer.File,
  ) {
    let imageUrl = createBannerDto.imageUrl || '';

    if (file) {
      imageUrl =
        await this.s3Service.uploadFile(file);
    }

    const banner = new this.bannerModel({
      ...createBannerDto,
      imageUrl,
    });

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
    file?: Express.Multer.File,
  ) {
    const updateData: any = {
      ...updateBannerDto,
    };

    if (file) {
      updateData.imageUrl =
        await this.s3Service.uploadFile(file);
    }

    const banner =
      await this.bannerModel.findByIdAndUpdate(
        id,
        updateData,
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