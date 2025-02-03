import { BadRequestException, Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Post } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UserModel } from "./models/user-model";
import { DuplicateEntityException } from "../../errors/duplicate-entity-exeption";
import { ApiBearerAuth } from "@nestjs/swagger";


@ApiBearerAuth()
@Controller('api/users')
export class UsersController {

    constructor(private readonly userRepository: UsersRepository) {

    }

    @Get(':id')
    async getAsync(@Param('id', ParseIntPipe) id: number) {

        const user = await this.userRepository.getAsync(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    };

    @Post()
    async postAsync(@Body() user: UserModel): Promise<any> {
        try {
            const newUser = await this.userRepository.createAsync(user);

            return newUser;
        }
        catch (error: any) {
            if (error instanceof DuplicateEntityException) {
                throw new BadRequestException(error.message);
            }

            throw new InternalServerErrorException(error.message);
        }
    };
}