import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PostModel } from './models/post-model';
import { NotFoundEntityException } from '../../errors/not-found-entity-exception';

@Injectable()
export class PostsRepository extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    async getAsync(id: number) {
        const post = await this.post.findUnique({
            where: {
                id: id,
            },
        });

        if (!post) {
            throw new NotFoundEntityException('Post not found.');
        }

        return post;
    }

    async getAllAsync() {
        const posts = await this.post.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        email: true,
                        username: true,
                    },
                },
                uploadedFiles: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        return posts;
    }

    async createAsync(post: PostModel) {
        const newPost = await this.post.create({
            data: post,
            include: {
                author: {
                    select: {
                        id: true,
                        email: true,
                        username: true,
                    },
                },
            },
        });

        return newPost;
    }

    async updateAsync(post: PostModel) {
        const existingPost = await this.post.findUnique({
            where: { id: post.id },
        });

        if (!existingPost) {
            throw new NotFoundEntityException('Post not found.');
        }

        const updatedPost = await this.post.update({
            where: { id: post.id },
            include: {
                uploadedFiles: {
                    select: {
                        id: true,
                    },
                },
                author: {
                    select: {
                        email: true,
                        username: true,
                    },
                },
            },
            data: {
                ...post,
                updatedAt: new Date(), // Update the timestamp
            },
        });

        return updatedPost;
    }

    async deleteAsync(id: number) {
        const post = await this.post.delete({
            where: { id: id },
        });

        if (!post) {
            throw new NotFoundEntityException('Post not found');
        }

        return post;
    }
}
