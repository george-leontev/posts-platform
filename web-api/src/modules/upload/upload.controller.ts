import { Controller, Get, Param, ParseIntPipe, Post, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UploadRepository } from "./upload.repository";
import { ApiBearerAuth, ApiConsumes } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('/api/upload')
export class UploadController {

    constructor(private readonly uploadRepository: UploadRepository) {

    }

    @Get('/list/:postId')
    async getAllAsync(@Param('postId', ParseIntPipe) id: number) {
        const files = await this.uploadRepository.getAllAsync(id);

        return files;
    }

    @Get('/:id')
    async getAsync(@Param('id', ParseIntPipe) id: number): Promise<any> {
        const image = await this.uploadRepository.getAsync(id);

        if (image) {
            const base64String = Buffer.from(image.data!).toString('base64');

            return base64String;
        }

        return null;
    }

    @Post('/:postId')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('fileUpload'))
    async postAsync(@Param('postId', ParseIntPipe) postId: number, @UploadedFile() file: Express.Multer.File) {
        const uploadedFile = this.uploadRepository.postAsync(postId, file);

        return { ...uploadedFile, data: null };
    }
}