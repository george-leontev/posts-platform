import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { Post, HttpCode, Param, UploadedFile, Get, Res, JsonController } from "routing-controllers";
import { prisma } from "../app";
import { UploadedFileModel } from "../models/uploaded-file-model";

@JsonController('/api/uploaded-files')
export class UploadedFileController {

    @Get('/list/:postId')
    async getAllAsync(@Param('postId') id: number) {
        const files = await prisma.uploadedFile.findMany({
            where: {
                postId: id
            },
            select: {
                id: true,
                fileName: true,
                mimeType: true,
                postId: true
            }
        });

        return files;
    }

    @Get('/:id')
    async getAsync(@Param('id') id: number, @Res() response: Response): Promise<any> {
        try {
            const image = await prisma.uploadedFile.findUnique({
                where: {
                    id: id
                },
            });

            if (image) {
                const base64String = Buffer.from(image.data!).toString('base64');

                return base64String;
            }

            return null;
        }
        catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve an image' });
        }
    }

    @Post('/:postId')
    @HttpCode(StatusCodes.CREATED)
    async postAsync(@Param('postId') postId: number, @UploadedFile("fileUpload") file: any) {
        try {

            const uploadedFile = await prisma.uploadedFile.create({
                data: {
                    data: file.buffer,
                    fileName: file.originalname,
                    mimeType: file.mimetype,
                    postId: postId
                } as UploadedFileModel
            });

            return { ...uploadedFile, data: null };
        }
        catch (error) {

        }
    }
}