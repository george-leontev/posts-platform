export type PostModel = {
    id: number;
    topic: string;
    message: string;
    // uploadedFile: bytes;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
}