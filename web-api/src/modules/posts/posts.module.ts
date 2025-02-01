import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsRepository } from "./posts.repository";

@Module({
    controllers: [PostsController],
    providers: [PostsRepository]
})
export class PostsModule {

}