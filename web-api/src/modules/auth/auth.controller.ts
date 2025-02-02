import {Body, Controller, Post, ValidationPipe} from "@nestjs/common";
import {LoginModel} from "./models/login-model";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('sign-in')
    async signIn(@Body(ValidationPipe) login: LoginModel) {
        const authUser = await this.authService.signIn(login);

        return authUser;
    }
}