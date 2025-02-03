import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthUserModel } from "../../modules/auth/models/auth-user-model";
import { Request } from 'express'

export const User = createParamDecorator<AuthUserModel>((_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    return (request as any).user;
});