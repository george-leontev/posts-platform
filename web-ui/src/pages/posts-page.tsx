import { useCallback, useEffect, useState } from 'react';
import { useAppDataContext } from '../contexts/app-data-context';
import { Box, Button, Snackbar, Tooltip } from '@mui/material';
import { PostDialog } from '../components/dialogs/post-dialog';
import { useAppSharedContext } from '../contexts/app-shared-context';
import { IoAddSharp as AddIcon } from 'react-icons/io5';
import { PostCard } from '../components/post-card';
import { Header } from '../components/header';
import { TemporaryDrawer } from '../components/drawer';
import { motion } from 'framer-motion';

import { ImageDialog } from '../components/dialogs/image-dialog';

export const PostsPage = () => {
    const { getPostsAsync } = useAppDataContext();
    const { setIsDialogVisible, setPosts, posts, isToastVisible, setIsToastVisible, isDrawerOpen, isDarkMode } =
        useAppSharedContext();
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [searchQuery, setSearchQuery] = useState('');

    const onDialogOpenClickHandler = useCallback(() => {
        setIsDialogVisible(true);
    }, [setIsDialogVisible]);

    useEffect(() => {
        (async () => {
            const posts = await getPostsAsync();
            if (posts) {
                setPosts(posts);
            }
        })();
    }, [getPostsAsync, setPosts]);

    useEffect(() => {
        const filteredPosts = posts.filter(
            (post) =>
                post.topic.toLowerCase().includes(searchQuery) || post.message.toLowerCase().includes(searchQuery),
        );
        setFilteredPosts(filteredPosts);
    }, [searchQuery, posts]);

    const onSearchChangeHandler = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value.toLowerCase();
            setSearchQuery(value);

            const filtered = posts.filter(
                (post) => post.topic.toLowerCase().includes(value) || post.message.toLowerCase().includes(value),
            );
            setFilteredPosts(filtered);
        },
        [posts, setSearchQuery, setFilteredPosts],
    );

    return (
        <motion.div className="flex flex-col h-full">
            <TemporaryDrawer />
            <Box
                className="flex flex-col min-h-screen h-full"
                sx={{ backgroundColor: 'background.default', color: 'text.primary', p: 2 }}
            >
                <Header onSearchChange={onSearchChangeHandler} searchQuery={searchQuery} />
                <div className={`transition-all duration-500 ${isDrawerOpen ? 'pl-[280px]' : 'pl-0'}`}>
                    {filteredPosts.length > 0 ? (
                        <div className="flex flex-col items-center w-full gap-6 p-4">
                            {filteredPosts.map((post, index) => {
                                return (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: index * 0.1,
                                            duration: 0.5,
                                            ease: 'easeOut',
                                        }}
                                    >
                                        <PostCard post={post} />
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center h-screen">
                            <p className="text-xl text-[#8c8c91]">No posts yet😞</p>
                            <Button onClick={onDialogOpenClickHandler}>Be first</Button>
                        </div>
                    )}
                </div>
            </Box>

            <div className="fixed bottom-6 right-6">
                <Tooltip title="Create post" placement="top">
                    <Button
                        className="w-16 h-16"
                        sx={{
                            backgroundColor: isDarkMode ? '#4d6bfe' : '#1976d2',
                            color: '#f3f3f3',
                            borderRadius: '100%',
                        }}
                        onClick={onDialogOpenClickHandler}
                    >
                        <AddIcon size={32} />
                    </Button>
                </Tooltip>
            </div>

            <PostDialog />
            <ImageDialog />

            <Snackbar
                open={isToastVisible}
                autoHideDuration={3000}
                onClose={() => setIsToastVisible(false)}
                message="The post was created or updated successfully!"
            />
        </motion.div>
    );
};
