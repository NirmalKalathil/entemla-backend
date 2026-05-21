import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateMlaDto {

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  mlaId: string;

  @IsNotEmpty()
  constituencyId: string;

  @IsNotEmpty()
  district: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  place: string;
}