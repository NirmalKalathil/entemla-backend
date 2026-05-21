import { IsNotEmpty } from "class-validator";

export class EmployeeLoginDto {
     @IsNotEmpty()
    employeeId: string;

    @IsNotEmpty()
    password: string;
}
