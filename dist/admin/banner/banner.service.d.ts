import { Model } from 'mongoose';
import { Banner } from './banner.schema';
export declare class BannerService {
    private bannerModel;
    constructor(bannerModel: Model<Banner>);
    create(createBannerDto: any): Promise<import("mongoose").Document<unknown, {}, Banner, {}, import("mongoose").DefaultSchemaOptions> & Banner & Required<{
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
    update(id: string, updateBannerDto: any): Promise<import("mongoose").Document<unknown, {}, Banner, {}, import("mongoose").DefaultSchemaOptions> & Banner & Required<{
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
