import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  place: string;

  @IsString()
  role:string

  @IsString()
  @MinLength(6)
  password: string;
}