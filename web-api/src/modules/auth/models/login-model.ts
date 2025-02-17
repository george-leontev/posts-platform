import {IsEmail, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginModel {
    @ApiProperty({default: "user@example.com"})
    @IsEmail()
    email?: string;

    @ApiProperty({default: "1234567890"})
    @IsNotEmpty()
    password?: string;
}