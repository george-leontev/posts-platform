import { ApiProperty } from '@nestjs/swagger';

export class AuthUserModel {
    @ApiProperty()
    userId: number;

    @ApiProperty()
    login: string;

    @ApiProperty()
    token: string;
}