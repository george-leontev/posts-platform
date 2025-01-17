import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Body, HttpCode, JsonController, Post, UnauthorizedError } from "routing-controllers";
import { LoginModel } from '../models/login-model';
import { UserRepository } from '../repositories/user-repository';
import { AuthUserModel } from '../models/auth-user-model';

/**
 * User sign-in and token generation.
 */
@JsonController('/auth')
export class AuthController {

    constructor(private userRepository: UserRepository) {
        this.userRepository = new UserRepository();
    }

    /**
     * Authenticates a user and generates a JWT token to sign-in successfully.
     * @param {LoginModel} login - The login object containing email and password.
     * @throws {UnauthorizedError} - Throws an error if the username or password is invalid.
     * @returns {Promise<string>} Returns a JWT token if authentication is successful.
     */
    @Post('/sign-in')
    @HttpCode(200)
    async signIn(@Body() login: LoginModel) {
        const user = await this.userRepository.getByEmail(login.email);

        if (!user) {
            throw new UnauthorizedError('Invalid username or user not found');
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(login.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedError('Invalid password');
        }

        // Generate a JWT token for the authenticated user
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!);

        return { login: user.email, token: token } as AuthUserModel;
    }
}