import { useCallback, useEffect } from 'react';
import { useAppDataContext } from '../contexts/app-data-context';
import { Button, Snackbar, Tooltip } from '@mui/material';
import { PostDialog } from '../components/dialogs/post-dialog';
import { useAppSharedContext } from '../contexts/app-shared-context';
import { IoAddSharp as AddIcon } from 'react-icons/io5';
import { PostCard } from '../components/post-card';
import { Header } from '../components/header';
import { TemporaryDrawer } from '../components/drawer';
import { motion } from 'framer-motion';

export const PostsPage = () => {
    const { getPostsAsync } = useAppDataContext();
    const { setIsDialogVisible, setPosts, posts, isToastVisible, setIsToastVisible, isDrawerOpen, isSmallScreen } =
        useAppSharedContext();

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

    return (
        <motion.div
            className="flex flex-col ml-[280px]"
            initial={{ marginLeft: 280 }}
            animate={{ marginLeft: isDrawerOpen && !isSmallScreen ? 280 : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
            <TemporaryDrawer />
            <div className="flex flex-col">
                <Header />
                {posts.length > 0 ? (
                    <div className="flex w-full flex-col items-center gap-6 p-4">
                        {posts.map((post, index) => {
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
                    <div className="flex flex-col justify-center items-center h-screen w-screen">
                        <p className="text-xl text-[#8c8c91]">No posts yet😞</p>
                        <Button onClick={onDialogOpenClickHandler}>Be first</Button>
                    </div>
                )}
            </div>

            <div className="fixed bottom-6 right-6">
                <Tooltip title="Create post" placement="top">
                    <Button
                        className="w-16 h-16"
                        sx={{ backgroundColor: '#1976d2', color: 'white', borderRadius: '100%' }}
                        onClick={onDialogOpenClickHandler}
                    >
                        <AddIcon size={32} />
                    </Button>
                </Tooltip>
            </div>

            <PostDialog />

            <Snackbar
                open={isToastVisible}
                autoHideDuration={3000}
                onClose={() => setIsToastVisible(false)}
                message="The post was created or updated successfully!"
            />
        </motion.div>
    );
};
