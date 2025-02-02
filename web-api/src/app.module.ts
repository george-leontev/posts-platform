import { Module } from "@nestjs/common";
import { UsersModule } from "./modules/users/users.module";
import { PostsModule } from "./modules/posts/posts.module";
import { RootModule } from "./modules/root/root.module";
import { UploadModule } from "./modules/upload/upload.module";
import {AuthModule} from "./modules/auth/auth.module";

@Module({
    imports: [RootModule, AuthModule, UsersModule, PostsModule, UploadModule],
})
export class AppModule {

}