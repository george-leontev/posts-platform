import { prisma } from "../app";
import { NotFoundEntityError } from "../errors/not-found-entity-error";
import { PostModel } from "../models/post-model";

export class PostRepository {

    async getAllAsync() {
        const posts = await prisma.post.findMany(
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

        const newPost = await prisma.post.create({
            data: { ...post }
        });

        return newPost;
    };

    async updateAsync(post: PostModel) {
        const existingPost = await prisma.post.findUnique({
            where: { id: post.id },
        });

        if (!existingPost) {
            throw new NotFoundEntityError('Post not found');
        }

        const updatedPost = await prisma.post.update({
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
        const post = await prisma.post.delete({
            where: { id: id },
        });

        if (!post) {
            throw new NotFoundEntityError('Post not found');
        }

        return post
    }
}