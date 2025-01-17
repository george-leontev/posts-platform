import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { PostModel } from '../models/post-model';
import { Button } from '@mui/material';

export const PostCard = ({ post }: any) => {
    const [showImage, setShowImage] = useState(false);

    const toggleImageHandler = () => {
        setShowImage((prev) => !prev);
    };

    return (
        <div
            key={ post.id }
            className="flex flex-col gap-6 min-w-[600px] min-h-72 p-6 bg-white rounded-lg shadow-md"
        >
            <h2 className="text-xl font-bold">{post.topic}</h2>
            <p className="text-gray-700">{post.message}</p>
            <Button
                variant='outlined'
                onClick={ toggleImageHandler }
                className="flex items-center text-blue-500 hover:underline"
            >
                <FaEye className="mr-2" />
                {showImage ? 'Hide Image' : 'Show Image'}
            </Button>
            {showImage && (
                <div className="mt-4">
                    <img
                        // src={ imageUrl }
                        alt={ post.topic }
                        className="w-full h-auto rounded"
                    />
                </div>
            )}
        </div>
    );
}
