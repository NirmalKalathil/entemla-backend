import { Document } from 'mongoose';
export declare class Banner extends Document {
    imageUrl: string;
    title: string;
    description: string;
    isActive: boolean;
}
export declare const BannerSchema: import("mongoose").Schema<Banner, import("mongoose").Model<Banner, any, any, any, any, any, Banner>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Banner, Document<unknown, {}, Banner, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Banner & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, Banner, Document<unknown, {}, Banner, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Banner & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Banner, Document<unknown, {}, Banner, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Banner & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Banner, Document<unknown, {}, Banner, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Banner & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, Banner, Document<unknown, {}, Banner, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Banner & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    imageUrl?: import("mongoose").SchemaDefinitionProperty<string, Banner, Document<unknown, {}, Banner, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Banner & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Banner>;
