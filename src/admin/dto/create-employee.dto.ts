import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateEmployeeDto {

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  employeeId: string;

  @IsNotEmpty()
  constituency: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  place: string;
}