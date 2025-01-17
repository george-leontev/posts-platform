import { useCallback, useEffect } from 'react';
import { useAppDataContext } from '../contexts/app-data-context';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AddPostDialog } from '../dialogs/add-post-dialog';
import { useAppSharedContext } from '../contexts/app-shared-context';

export const PostsPage = () => {
    const { getPostsAsync } = useAppDataContext();
    const { setIsDialogVisible, setPosts, posts } = useAppSharedContext();

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
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <div className="flex flex-col w-full items-center gap-6 p-4">
                {posts.map((post) => {
                    return (
                        <div
                            key={ post.id }
                            className="flex flex-col gap-6 w-full h-48 max-w-md p-6 bg-white rounded-lg shadow-md"
                        >
                            <h2 className="text-xl font-bold">{post.topic}</h2>
                            <p className="text-gray-700">{post.message}</p>
                        </div>
                    );
                })}
            </div>

            <div className='absolute bottom-4 right-4'>
                <Button className='w-14 h-14' sx={ { backgroundColor: '#1976d2', color: 'white', borderRadius: '100%' } } onClick={ onDialogOpenClickHandler }>
                    <AddIcon />
                </Button>
            </div>

            <AddPostDialog />
        </div>
    );
};
