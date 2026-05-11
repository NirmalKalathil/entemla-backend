import { IsNotEmpty, IsString, IsEnum, IsOptional, IsMongoId } from 'class-validator';

export class CreateComplaintDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsEnum(['Normal', 'Medium', 'Urgent'], {
    message: 'Urgency must be Normal, Medium, or Urgent',
  })
  urgency: string;

  @IsString()
  @IsNotEmpty()
  details: string;

  @IsString()
  @IsOptional()
  visibility: string;

  @IsMongoId() // Ensures the ID sent from React is a valid MongoDB ObjectId format
  @IsNotEmpty()
  citizenId: string;
}