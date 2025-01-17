import { Request } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        files: {
            [key: string]: {
                name: string;
                data: Buffer;
                size: number;
                mv: (path: string, callback: (err: Error) => void) => void; // Method to move the file
            };
        };
    }
}