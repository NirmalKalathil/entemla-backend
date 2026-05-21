"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RagModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const rag_service_1 = require("./rag.service");
const rag_controller_1 = require("./rag.controller");
const kb_service_1 = require("./kb.service");
const kb_schema_1 = require("./kb.schema");
let RagModule = class RagModule {
};
exports.RagModule = RagModule;
exports.RagModule = RagModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forFeature([
                { name: 'KnowledgeBase', schema: kb_schema_1.KnowledgeBaseSchema },
            ]),
        ],
        controllers: [rag_controller_1.RagController],
        providers: [
            {
                provide: rag_service_1.RagService,
                useClass: rag_service_1.RagService,
            },
            {
                provide: kb_service_1.KbService,
                useClass: kb_service_1.KbService,
            },
        ],
        exports: [rag_service_1.RagService, kb_service_1.KbService],
    })
], RagModule);
//# sourceMappingURL=rag.module.js.map