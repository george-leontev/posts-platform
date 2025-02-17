import { ApiProperty } from '@nestjs/swagger';

export class UploadedFileModel {
    @ApiProperty()
    id: number;

    @ApiProperty()
    data: any;

    @ApiProperty()
    fileName: string;

    @ApiProperty()
    mimeType: string;

    @ApiProperty()
    postId: number;
}