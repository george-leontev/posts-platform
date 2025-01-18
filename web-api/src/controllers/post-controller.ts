import { Body, Delete, Get, HttpCode, JsonController, Param, Post, Put, Req, Res, UploadedFile, UseBefore } from 'routing-controllers';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PostRepository } from '../repositories/post-repository';
import { Authorize } from '../middleware/authorize';
import { NotFoundEntityError } from '../errors/not-found-entity-error';
import { PostModel } from '../models/post-model';
import { UserModel } from '../models/user-model';
import { AuthUser } from '../decorators/auth-user';
import { prisma } from '../app';
import { UploadedFileModel } from '../models/uploaded-file-model';


@JsonController('/api/posts')
@UseBefore(Authorize)
export class PostController {

    constructor(private postRepository: PostRepository) {
        this.postRepository = new PostRepository();
    }

    @Get()
    async getAllAsync(@Res() response: Response): Promise<any> {
        try {
            const posts = await this.postRepository.getAllAsync();

            return posts;
        }
        catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve posts' });
        }
    }

    @Post()
    @HttpCode(StatusCodes.CREATED)
    async postAsync(
        @AuthUser() user: UserModel,
        @Body() post: PostModel,
        @Res() response: Response,
        @Req() request: Request
    ): Promise<any> {
        try {
            const newPost = await this.postRepository.createAsync({ ...post, userId: user.id, });

            return newPost;
        }
        catch (error) {
            console.error(error);
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
    };

    @Post('/upload/:postId')
    @HttpCode(StatusCodes.CREATED)
    async postMediaFileAsync(@Param('postId') postId: number, @UploadedFile("fileUpload") file: any) {
        try {

            const uploadedFile = prisma.uploadedFile.create({
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

    @Get('/download/:id')
    async getMediaFileAsync(@Param('id') id: number, @Res() response: Response): Promise<any> {
        try {
            const image = await prisma.uploadedFile.findUnique({
                where: {
                    id: id
                },
            });

            const buffer = Buffer.from(image!.data!);

            // Convert the Buffer to a Base64 string
            const base64String = buffer.toString('base64');

            return base64String;
        }
        catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve an image' });
        }
    }

    @Put('/:id')
    async updateAsync(@Param('id') id: number, @Body() feedback: PostModel, @Res() response: any): Promise<any> {
        try {
            const updatedFeedback = await this.postRepository.updateAsync(id, feedback);

            return updatedFeedback;
        }
        catch (error: any) {
            console.error(error);
            if (error instanceof NotFoundEntityError) {
                return response.status(StatusCodes.NOT_FOUND).json({ message: error.message });
            }

            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
    };

    @Delete('/:id')
    async deleteAsync(@Param('id') id: number, @Res() response: any): Promise<any> {
        try {
            const deletedFeedback = await this.postRepository.deleteAsync(id);

            return deletedFeedback;
        }
        catch (error) {
            if (error instanceof NotFoundEntityError) {
                return response.status(StatusCodes.NOT_FOUND).json({ message: error.message });
            }
            console.error(error);
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
    };
}