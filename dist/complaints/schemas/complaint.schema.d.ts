import { HydratedDocument, Types } from 'mongoose';
export type ComplaintDocument = HydratedDocument<Complaint>;
export declare class Complaint {
    title: string;
    category: string;
    urgency: string;
    details: string;
    visibility: string;
    status: string;
    citizenId: Types.ObjectId;
    evidence?: string;
    location?: string;
    likes: number;
    likedBy: Types.ObjectId[];
    reposts: number;
    repostedBy: Types.ObjectId[];
    views: number;
    comment: string;
    constituencyId: Types.ObjectId;
    replies: {
        userId?: Types.ObjectId;
        username?: string;
        text: string;
        role?: string;
        from?: string;
        createdAt?: Date;
    }[];
}
export declare const ComplaintSchema: import("mongoose").Schema<Complaint, import("mongoose").Model<Complaint, any, any, any, any, any, Complaint>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Complaint, import("mongoose").Document<unknown, {}, Complaint, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Complaint & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Complaint, import("mongoose").Document<unknown, {}, Complaint, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string, Complaint, import("mongoose").Document<unknown, {}, Complaint, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    urgency?: import("mongoose").SchemaDefinitionProperty<string, Complaint, import("mongoose").Document<unknown, {}, Complaint, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    details?: import("mongoose").SchemaDefinitionProperty<string, Complaint, import("mongoose").Document<unknown, {}, Complaint, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    visibility?: import("mongoose").SchemaDefinitionProperty<string, Complaint, import("mongoose").Document<unknown, {}, Complaint, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Complaint, import("mongoose").Document<unknown, {}, Complaint, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    citizenId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Complaint, import("mongoose").Document<unknown, {}, Complaint, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    evidence?: import("mongoose").SchemaDefinitionProperty<string | undefined, Complaint, import("mongoose").Document<unknown, {}, Complaint, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    location?: import("mongoose").SchemaDefinitionProperty<string | undefined, Complaint, import("mongoose").Document<unknown, {}, Complaint, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    likes?: import("mongoose").SchemaDefinitionProperty<number, Complaint, import("mongoose").Document<unknown, {}, Complaint, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    likedBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId[], Complaint, import("mongoose").Document<unknown, {}, Complaint, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    reposts?: import("mongoose").SchemaDefinitionProperty<number, Complaint, import("mongoose").Document<unknown, {}, Complaint, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    repostedBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId[], Complaint, import("mongoose").Document<unknown, {}, Complaint, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    views?: import("mongoose").SchemaDefinitionProperty<number, Complaint, import("mongoose").Document<unknown, {}, Complaint, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    comment?: import("mongoose").SchemaDefinitionProperty<string, Complaint, import("mongoose").Document<unknown, {}, Complaint, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    constituencyId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Complaint, import("mongoose").Document<unknown, {}, Complaint, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    replies?: import("mongoose").SchemaDefinitionProperty<{
        userId?: Types.ObjectId;
        username?: string;
        text: string;
        role?: string;
        from?: string;
        createdAt?: Date;
    }[], Complaint, import("mongoose").Document<unknown, {}, Complaint, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Complaint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Complaint>;
