import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  district: string; // Added this field

  @IsString()
  @IsNotEmpty()
  constituencyId: string; // Changed from IsOptional to match your form

  @IsString()
  @IsNotEmpty()
  place: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @MinLength(6)
  password: string;
}