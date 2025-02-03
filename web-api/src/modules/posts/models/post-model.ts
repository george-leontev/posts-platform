import { ApiProperty } from "@nestjs/swagger";

export class PostModel {
    @ApiProperty()
    id: number;

    @ApiProperty()
    topic: string;

    @ApiProperty()
    message: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    userId: number;
}