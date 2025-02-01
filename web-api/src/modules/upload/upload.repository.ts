import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UploadedFileModel } from "./models/upload-model";

@Injectable()
export class UploadRepository extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    async getAllAsync(id: number) {
        const files = await this.uploadedFile.findMany({
            where: {
                postId: id
            },
            select: {
                id: true,
                fileName: true,
                mimeType: true,
                postId: true
            },
            orderBy: {
                id: "desc"
            }
        });

        return files;
    }

    async getAsync(id: number) {
        const file = await this.uploadedFile.findUnique({
            where: {
                id: id
            },
        });

        return file;
    }

    async postAsync(postId: number, file: any) {
        const newFile = await this.uploadedFile.create({
            data: {
                data: file.buffer,
                fileName: file.originalname,
                mimeType: file.mimetype,
                postId: postId
            } as UploadedFileModel
        });

        return newFile;
    }
}