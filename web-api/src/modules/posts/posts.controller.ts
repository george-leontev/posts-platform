import {
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { PostModel } from './models/post-model';
import { PostsRepository } from './posts.repository';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { NotFoundEntityException } from '../../errors/not-found-entity-exception';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUserModel } from '../auth/models/auth-user-model';
import { User } from '../../common/decorators/user.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('api/posts')
export class PostsController {
    constructor(private readonly postsRepository: PostsRepository) {}

    @Get('/:id')
    async getAsync(@Param('id', ParseIntPipe) id: number) {
        const post = this.postsRepository.getAsync(id);

        return post;
    }

    @Get()
    async getAllAsync() {
        const posts = await this.postsRepository.getAllAsync();

        return posts;
    }

    @ApiBody({
        type: PostModel,
    })
    @Post()
    async postAsync(@Body() post: PostModel, @User() user: AuthUserModel): Promise<any> {
        const newPost = await this.postsRepository.createAsync({ ...post, userId: user.userId });

        return newPost;
    }

    @Put()
    async updateAsync(@Body() post: PostModel) {
        try {
            const updatedPost = await this.postsRepository.updateAsync(post);

            return updatedPost;
        } catch (error: any) {
            if (error instanceof NotFoundEntityException) {
                throw new NotFoundException(error.message);
            }

            throw new InternalServerErrorException(error.message);
        }
    }

    @Delete('/:id')
    async deleteAsync(@Param('id', ParseIntPipe) id: number) {
        try {
            const deletedFeedback = await this.postsRepository.deleteAsync(id);

            return deletedFeedback;
        } catch (error: any) {
            if (error instanceof NotFoundEntityException) {
                throw new NotFoundException(error.message);
            }
            throw new InternalServerErrorException(error.message);
        }
    }
}
