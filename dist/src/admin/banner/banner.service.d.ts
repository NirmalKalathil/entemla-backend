import { Model } from 'mongoose';
import { Banner } from './banner.schema';
import { S3Service } from '../../../s3/s3.service';
export declare class BannerService {
    private bannerModel;
    private readonly s3Service;
    constructor(bannerModel: Model<Banner>, s3Service: S3Service);
    create(createBannerDto: any, file?: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, Banner, {}, import("mongoose").DefaultSchemaOptions> & Banner & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Banner, {}, import("mongoose").DefaultSchemaOptions> & Banner & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findActive(): Promise<(import("mongoose").Document<unknown, {}, Banner, {}, import("mongoose").DefaultSchemaOptions> & Banner & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    update(id: string, updateBannerDto: any, file?: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, Banner, {}, import("mongoose").DefaultSchemaOptions> & Banner & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
