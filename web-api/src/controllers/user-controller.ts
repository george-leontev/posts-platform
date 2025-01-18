import { JsonController, Param, Res, Get, UseBefore, Post, HttpCode, Body } from 'routing-controllers'
import { UserModel } from '../models/user-model';
import { UserRepository } from '../repositories/user-repository';
// import { DuplicateEntityError } from '../errors/duplicate-entity-error';
import { StatusCodes } from 'http-status-codes';
import { Authorize } from '../middleware/authorize';
import { DuplicateEntityError } from '../errors/duplicate-entity-error';

/**
 * UserController handles HTTP requests related to user operations.
 * It provides endpoints to get and post user.
 */
@UseBefore(Authorize)
@JsonController('/api/users')
export class UserController {

    constructor(private userRepository: UserRepository) {
        this.userRepository = new UserRepository();
    }

    @Get('/:id')
    async getAsync(@Param('id') id: number, @Res() response: any): Promise<any> {
        try {
            const user = await this.userRepository.getAsync(id);

            if (!user) {
                return response.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
            }

            return user;
        }
        catch (error) {
            console.error(error);

            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error: ' + (error as Error).message });
        }
    };

    @Post()
    @HttpCode(StatusCodes.CREATED)
    async postAsync(@Body() user: UserModel, @Res() response: any): Promise<any> {

        try {
            const newUser = await this.userRepository.createAsync(user);

            return newUser;
        }
        catch (error: any) {
            console.error(error);
            if (error instanceof DuplicateEntityError) {
                return response.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
            }

            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
    };
}