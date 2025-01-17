export type PostModel = {
    id: number;
    topic: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
}