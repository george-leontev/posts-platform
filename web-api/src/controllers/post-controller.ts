import { Get, JsonController, Res } from 'routing-controllers';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PostRepository } from '../repositories/posts-repository';



@JsonController('/api/posts')
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
}