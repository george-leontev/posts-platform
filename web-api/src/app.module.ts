import { Module } from "@nestjs/common";
import { UsersModule } from "./modules/users/users.module";
import { PostsModule } from "./modules/posts/posts.module";
import { RootModule } from "./modules/root/root.module";
import { UploadModule } from "./modules/upload/upload.module";

@Module({
    imports: [RootModule, UsersModule, PostsModule, UploadModule],
})
export class AppModule {

}