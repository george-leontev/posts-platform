import {Body, Controller, Post, ValidationPipe} from "@nestjs/common";
import {LoginModel} from "./models/login-model";
import {AuthService} from "./auth.service";
import { AuthUserModel } from './models/auth-user-model';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('sign-in')
    async signIn(@Body(ValidationPipe) login: LoginModel) {
        const authUser: AuthUserModel = await this.authService.signIn(login);

        return authUser;
    }
}