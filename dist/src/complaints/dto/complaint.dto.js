"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateComplaintDto = exports.VisibilityType = exports.UrgencyLevel = void 0;
const class_validator_1 = require("class-validator");
var UrgencyLevel;
(function (UrgencyLevel) {
    UrgencyLevel["NORMAL"] = "Normal";
    UrgencyLevel["MEDIUM"] = "Medium";
    UrgencyLevel["URGENT"] = "Urgent";
})(UrgencyLevel || (exports.UrgencyLevel = UrgencyLevel = {}));
var VisibilityType;
(function (VisibilityType) {
    VisibilityType["PUBLIC"] = "Public";
    VisibilityType["PRIVATE"] = "Private";
})(VisibilityType || (exports.VisibilityType = VisibilityType = {}));
class CreateComplaintDto {
}
exports.CreateComplaintDto = CreateComplaintDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateComplaintDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateComplaintDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(UrgencyLevel, {
        message: 'Urgency must be Normal, Medium, or Urgent',
    }),
    __metadata("design:type", String)
], CreateComplaintDto.prototype, "urgency", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateComplaintDto.prototype, "details", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(VisibilityType, {
        message: 'Visibility must be Public or Private',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateComplaintDto.prototype, "visibility", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateComplaintDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateComplaintDto.prototype, "evidence", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)({
        message: 'Invalid citizen ID',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateComplaintDto.prototype, "citizenId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateComplaintDto.prototype, "rejectionReason", void 0);
//# sourceMappingURL=complaint.dto.js.map