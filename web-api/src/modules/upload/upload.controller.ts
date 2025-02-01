import { Controller, Get, Param, Post, Res, UploadedFile } from "@nestjs/common";
import { UploadRepository } from "./upload.repository";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller('/api/upload')
export class UploadController {

    constructor(private readonly uploadRepository: UploadRepository) {

    }

    @Get('/list/:postId')
    async getAllAsync(@Param('postId') id: number) {
        const files = await this.uploadRepository.getAllAsync(id);

        return files;
    }

    @Get('/:id')
    async getAsync(@Param('id') id: number, @Res() response: Response): Promise<any> {
        const image = await this.uploadRepository.getAsync(id);

        if (image) {
            const base64String = Buffer.from(image.data!).toString('base64');

            return base64String;
        }

        return null;
    }

    @Post('/:postId')
    async postAsync(@Param('postId') postId: number, @UploadedFile("fileUpload") file: any) {
        const uploadedFile = this.uploadRepository.postAsync(postId, file);

        return { ...uploadedFile, data: null };
    }
}