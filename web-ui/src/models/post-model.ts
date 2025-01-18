export type PostModel = {
    id: number;
    topic: string;
    message: string;
    uploadedFiles?: { id: number }[];
}

export const defaultPost = {
    id: 0,
    topic: '',
    message: '',
} as PostModel;