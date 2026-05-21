import { Document } from 'mongoose';
export declare class KnowledgeBase extends Document {
    content: string;
    embedding: number[];
    source: string;
    category: string;
}
export declare const KnowledgeBaseSchema: import("mongoose").Schema<KnowledgeBase, import("mongoose").Model<KnowledgeBase, any, any, any, any, any, KnowledgeBase>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, KnowledgeBase, Document<unknown, {}, KnowledgeBase, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<KnowledgeBase & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, KnowledgeBase, Document<unknown, {}, KnowledgeBase, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<KnowledgeBase & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    source?: import("mongoose").SchemaDefinitionProperty<string, KnowledgeBase, Document<unknown, {}, KnowledgeBase, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<KnowledgeBase & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string, KnowledgeBase, Document<unknown, {}, KnowledgeBase, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<KnowledgeBase & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    content?: import("mongoose").SchemaDefinitionProperty<string, KnowledgeBase, Document<unknown, {}, KnowledgeBase, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<KnowledgeBase & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    embedding?: import("mongoose").SchemaDefinitionProperty<number[], KnowledgeBase, Document<unknown, {}, KnowledgeBase, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<KnowledgeBase & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, KnowledgeBase>;
