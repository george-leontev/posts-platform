import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthUserModel } from './models/auth-user-model';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        const authorizationHeader = request.header('authorization');

        if (!authorizationHeader) {
            throw new UnauthorizedException();
        }

        const [bearer, token] = authorizationHeader.split(' ');
        if (!token || bearer !== 'Bearer') {
            throw new UnauthorizedException();
        }

        try {
            const authUser: AuthUserModel = await this.jwtService.verifyAsync<AuthUserModel>(token, {
                secret: process.env.JWT_SECRET,
            });

            (request as any)['user'] = authUser;
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }
}
