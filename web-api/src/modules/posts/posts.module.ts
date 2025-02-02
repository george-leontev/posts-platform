import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsRepository } from "./posts.repository";
import {AuthGuard} from "../auth/auth.guard";
import {JwtService} from "@nestjs/jwt";

@Module({
    controllers: [PostsController],
    providers: [PostsRepository, JwtService ,AuthGuard]
})
export class PostsModule {

}