import { prisma } from "../app";

export class PostRepository {

    async getAllAsync() {
        const posts = await prisma.post.findMany();

        return posts
    }
}