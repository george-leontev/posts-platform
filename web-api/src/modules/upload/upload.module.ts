import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { UploadRepository } from "./upload.repository";
import { AuthGuard } from "../auth/auth.guard";
import { JwtService } from "@nestjs/jwt";

@Module({
    controllers: [UploadController],
    providers: [UploadRepository, JwtService, AuthGuard]
})
export class UploadModule {

}