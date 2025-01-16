import { Body, Delete, Get, HttpCode, JsonController, Param, Post, Put, Res, UseBefore } from 'routing-controllers';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PostRepository } from '../repositories/post-repository';
import { Authorize } from '../middleware/authorize';
import { NotFoundEntityError } from '../errors/not-found-entity-error';
import { PostModel } from '../models/post-model';


@JsonController('/api/posts')
@UseBefore(Authorize)
export class PostController {

    constructor(private postRepository: PostRepository) {
        this.postRepository = new PostRepository();
    }


    @Get()
    async getAllAsync(@Res() response: Response): Promise<any> {
        try {
            const posts = this.postRepository.getAllAsync();

            return posts;
        }
        catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve posts' });
        }
    }

    @Post()
    @HttpCode(StatusCodes.CREATED)
    async postAsync(@Body() feedback: PostModel, @Res() response: Response): Promise<any> {

        try {
            const newFeedback = await this.postRepository.createAsync(feedback as PostModel);

            return newFeedback;
        }
        catch (error) {
            console.error(error);
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
    };

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
    @HttpCode(StatusCodes.NO_CONTENT)
    async deleteAsync(@Param('id') id: number, @Res() response: any): Promise<any> {
        try {
            const deletedFeedback = this.postRepository.deleteAsync(id);

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