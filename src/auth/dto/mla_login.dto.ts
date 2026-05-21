import { IsNotEmpty } from "class-validator";

export class MlaLoginDto {

    @IsNotEmpty()
    mlaId: string;

    @IsNotEmpty()
    password: string;
}