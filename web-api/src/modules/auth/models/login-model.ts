import {IsEmail, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginModel {
    @ApiProperty()
    @IsEmail()
    email?: string;

    @ApiProperty()
    @IsNotEmpty()
    password?: string;
}