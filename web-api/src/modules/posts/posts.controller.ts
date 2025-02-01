import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, OnModuleInit, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PostModel } from "./models/post-model";
import { PostsRepository } from "./posts.repository";
import { ApiBearerAuth } from "@nestjs/swagger";
import { NotFoundEntityExeption } from "../../errors/not-found-entity-exeption";

@ApiBearerAuth()
@Controller('api/posts')
export class PostsController {

    constructor(private readonly postsRepository: PostsRepository) {

    }

    @Get('/:id')
    async getAsync(@Param('id', ParseIntPipe) id: number) {
        const post = this.postsRepository.getAsync(id);

        return post
    }

    @Get()
    async getAllAsync() {
        const posts = await this.postsRepository.getAllAsync();

        return posts;
    }

    @Post()
    async postAsync(
        @Body() post: PostModel,
    ): Promise<any> {
        // TODO: recode this
        const newPost = await this.postsRepository.createAsync({ ...post, userId: 1 });

        return newPost;
    };

    @Put()
    async updateAsync(@Body() post: PostModel) {
        try {
            const updatedPost = await this.postsRepository.updateAsync(post);

            return updatedPost;
        }
        catch (error: any) {
            console.error(error);
            if (error instanceof NotFoundEntityExeption) {
                throw new NotFoundException(error.message);
            }

            throw new InternalServerErrorException(error.message);
        }
    };

    @Delete('/:id')
    async deleteAsync(@Param('id') id: number) {
        try {
            const deletedFeedback = await this.postsRepository.deleteAsync(id);

            return deletedFeedback;
        }
        catch (error: any) {
            if (error instanceof NotFoundEntityExeption) {
                throw new NotFoundException(error.message);
            }
            throw new InternalServerErrorException(error.message)
        }
    };
}