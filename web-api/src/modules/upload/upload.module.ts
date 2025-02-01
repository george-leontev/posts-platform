import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { UploadRepository } from "./upload.repository";

@Module({
    controllers: [UploadController],
    providers: [UploadRepository]
})
export class UploadModule {

}