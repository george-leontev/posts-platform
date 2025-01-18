export type PostModel = {
    id: number;
    topic: string;
    message: string;
    uploadedFiles?: { id: number }[];
}