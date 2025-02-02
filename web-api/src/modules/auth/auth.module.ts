import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {UsersRepository} from "../users/users.repository";
import {JwtService} from "@nestjs/jwt";

@Module({
    controllers: [AuthController],
    providers: [UsersRepository, JwtService, AuthService],
})
export class AuthModule {

}