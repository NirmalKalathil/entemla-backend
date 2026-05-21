import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsMongoId,
} from 'class-validator';

export enum UrgencyLevel {
  NORMAL = 'Normal',
  MEDIUM = 'Medium',
  URGENT = 'Urgent',
}

export enum VisibilityType {
  PUBLIC = 'Public',
  PRIVATE = 'Private',
}

export class CreateComplaintDto {

  @IsString()
  @IsNotEmpty()
  title!:string;

  @IsString()
  @IsNotEmpty()
  category!:string;

  @IsEnum(UrgencyLevel, {
    message:
      'Urgency must be Normal, Medium, or Urgent',
  })
  urgency!:UrgencyLevel;

  @IsString()
  @IsNotEmpty()
  details!:string;

  @IsEnum(VisibilityType, {
    message:
      'Visibility must be Public or Private',
  })
  @IsOptional()
  visibility?: VisibilityType;

  @IsString()
  @IsOptional()
  location?: string;

  // Image filename or URL
  @IsString()
  @IsOptional()
  evidence?: string;

  @IsMongoId({
    message: 'Invalid citizen ID',
  })
  @IsNotEmpty()
  citizenId! : string;

}