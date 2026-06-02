import { BannerService } from './banner.service';
export declare class BannerController {
    private readonly bannerService;
    constructor(bannerService: BannerService);
    create(createBannerDto: any): Promise<import("mongoose").Document<unknown, {}, import("./banner.schema").Banner, {}, import("mongoose").DefaultSchemaOptions> & import("./banner.schema").Banner & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./banner.schema").Banner, {}, import("mongoose").DefaultSchemaOptions> & import("./banner.schema").Banner & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findActive(): Promise<(import("mongoose").Document<unknown, {}, import("./banner.schema").Banner, {}, import("mongoose").DefaultSchemaOptions> & import("./banner.schema").Banner & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    update(id: string, updateBannerDto: any): Promise<import("mongoose").Document<unknown, {}, import("./banner.schema").Banner, {}, import("mongoose").DefaultSchemaOptions> & import("./banner.schema").Banner & Required<{
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
