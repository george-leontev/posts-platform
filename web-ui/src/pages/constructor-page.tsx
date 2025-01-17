import { useState } from 'react';
import { motion } from 'framer-motion';
import { TextField, Button, Typography } from '@mui/material';
import { PostModel } from '../models/post-model';
import { useAppDataContext } from '../contexts/app-data-context';

export const ConstructorPage = () => {
    const [posts, setPosts] = useState<PostModel[]>([]);
    const [message, setMessage] = useState<string>('');
    const [topic, setTopic] = useState<string>('');
    const { addPostAsync } = useAppDataContext();

    const handlePost = async () => {
        if (message.trim() && topic.trim()) {
            const newPost = {
                id: 0,
                topic: topic,
                message: message,
            };

            const createdPost = await addPostAsync(newPost as PostModel);

            setPosts(prevPosts => [...prevPosts, createdPost!]);
            setMessage('');
            setTopic('');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-6 max-w-md p-6 bg-white rounded-lg shadow-md"
            >
                <Typography variant="h4">
                    Create a Post
                </Typography>
                <TextField
                    label="Topic"
                    variant="outlined"
                    fullWidth
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="mb-2"
                />
                <TextField
                    label="What's on your mind?"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mb-4"
                />
                <Button variant="contained" color="primary" onClick={handlePost}>
                    Post
                </Button>
            </motion.div>

            <div className="mt-8 w-full max-w-md">
                {posts.map((post) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="my-4 p-4 bg-white rounded-lg shadow-md"
                    >
                        <Typography variant="h6">{post.topic}</Typography>
                        <Typography variant="body1">{post.message}</Typography>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};