import { Body, Delete, Get, HttpCode, JsonController, Param, Post, Put, Req, Res, UseBefore } from 'routing-controllers';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PostRepository } from '../repositories/post-repository';
import { Authorize } from '../middleware/authorize';
import { NotFoundEntityError } from '../errors/not-found-entity-error';
import { PostModel } from '../models/post-model';
import { UserModel } from '../models/user-model';
import { AuthUser } from '../decorators/auth-user';
import { prisma } from '../app';


@JsonController('/api/posts')
@UseBefore(Authorize)
export class PostController {

    constructor(private postRepository: PostRepository) {
        this.postRepository = new PostRepository();
    }

    @Get('/:id')
    async getAsync(@Param('id') id: number, @Res() response: Response): Promise<any> {
        try {
            const post = await prisma.post.findUnique(
                {
                    where: {
                        id: id
                    }
                }
            );

            return post
        }
        catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve posts' });
        }
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

    @Put()
    async updateAsync(@Body() post: PostModel, @Res() response: any): Promise<any> {
        try {
            const updatedPost = await this.postRepository.updateAsync(post);

            return updatedPost;
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