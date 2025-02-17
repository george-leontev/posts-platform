import { UserModel } from "./user-model";

export type PostModel = {
    id: number;
    topic: string;
    message: string;
    author: UserModel;
    uploadedFiles?: { id: number }[];
}

export const defaultPost = {
    id: 0,
    topic: '',
    message: '',
} as PostModel;