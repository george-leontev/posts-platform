import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {LoginModel} from "./models/login-model";
import {UsersRepository} from "../users/users.repository";
import bcrypt from "bcrypt";
import {AuthUserModel} from "./models/auth-user-model";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly usersRepository: UsersRepository) {
    }

    async signIn(login: LoginModel): Promise<AuthUserModel> {
        const user = await this.usersRepository.getByEmail(login.email!);

        if (!user) {
            throw new UnauthorizedException();
        }

        const isValidPassword = await bcrypt.compare(login.password!, user.password);
        if (!isValidPassword) {
            throw new UnauthorizedException();
        }

        const token = await this.jwtService.signAsync({userId: user.id, email: user.email}, {
            secret: process.env.JWT_SECRET
        });

        return {userId: user.id, token: token} as AuthUserModel;
    }
}