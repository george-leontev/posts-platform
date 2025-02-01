import { PrismaClient } from "@prisma/client";
import { DuplicateEntityException } from "../../errors/duplicate-entity-exeption";
import { UserModel } from "./models/user-model";
import bcrypt from 'bcrypt';
import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class UsersRepository extends PrismaClient implements OnModuleInit {

    async onModuleInit() {
        await this.$connect();
    }

    async getAsync(id: number): Promise<UserModel | null> {
        const user = await this.user.findUnique({
            where: { id: id },
        });

        return user ? user as UserModel : user; // Returns casted to UserModel user if found and null otherwise
    }

    async getByEmail(email: string): Promise<UserModel | null> {
        const user = await this.user.findUnique({
            where: { email: email }
        });

        return user ? user as UserModel : user;  // Returns casted to UserModel user if found and null otherwise
    }


    /**
     * Creates a new user in the database
     * @param {UserModel} user - The user object containing user info.
     * @throws {DuplicateEntityException} - Throws an error if the user already exists.
     * @returns {Promise<UserModel>} Returns the created user object.
     */
    async createAsync(user: UserModel): Promise<UserModel> {
        const existingUser = await this.user.findUnique({
            where: { email: user.email },
        });

        if (existingUser) {
            throw new DuplicateEntityException('User already exists');
        }

        // Hash the user's password before storing
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);

        const newUser = await this.user.create({
            data: {
                ...user,
                password: hashedPassword,
            },
        });

        return newUser;
    };
}