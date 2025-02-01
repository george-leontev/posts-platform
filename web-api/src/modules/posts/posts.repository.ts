import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PostModel } from "./models/post-model";
import { NotFoundEntityExeption } from "../../errors/not-found-entity-exeption";

@Injectable()
export class PostsRepository extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    async getAsync(id: number) {
        const post = await this.post.findUnique({
            where: {
                id: id
            }
        });

        if (!post) {
            throw new NotFoundEntityExeption('Post not found.');
        }

        return post;
    }

    async getAllAsync() {
        const posts = await this.post.findMany(
            {
                include: {
                    uploadedFiles: {
                        select: {
                            id: true,
                        },
                    },
                },
            }
        );

        return posts
    };

    async createAsync(post: PostModel) {

        const newPost = await this.post.create({
            data: { ...post }
        });

        return newPost;
    };

    async updateAsync(post: PostModel) {
        const existingPost = await this.post.findUnique({
            where: { id: post.id },
        });

        if (!existingPost) {
            throw new NotFoundEntityExeption('Post not found.');
        }

        const updatedPost = await this.post.update({
            where: { id: post.id },
            include: {
                uploadedFiles: {
                    select: {
                        id: true,
                    },
                },
            },
            data: {
                ...post,
                updatedAt: new Date(), // Update the timestamp
            },
        });

        return updatedPost;
    };

    async deleteAsync(id: number) {
        const post = await this.post.delete({
            where: { id: id },
        });

        if (!post) {
            throw new NotFoundEntityExeption('Post not found');
        }

        return post
    }
}