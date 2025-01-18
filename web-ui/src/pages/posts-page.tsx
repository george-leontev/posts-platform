import { useCallback, useEffect } from 'react';
import { useAppDataContext } from '../contexts/app-data-context';
import { Button, Snackbar, Tooltip } from '@mui/material';
import { PostDialog } from '../dialogs/post-dialog';
import { useAppSharedContext } from '../contexts/app-shared-context';
import { IoAddSharp as AddIcon } from 'react-icons/io5';
import { PostCard } from '../components/post-card';

export const PostsPage = () => {
    const { getPostsAsync } = useAppDataContext();
    const { setIsDialogVisible, setPosts, posts, isToastVisible, setIsToastVisible } = useAppSharedContext();

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
        <>
            <div className='flex flex-col min-h-screen bg-gray-100'>
                <div className="flex flex-col items-center justify-center w-full gap-6 p-4">
                    {posts.map((post) => {
                        return (
                            <div key={ post.id }>
                                <PostCard post={ post } />
                            </div>
                        );
                    })}
                </div>

                <div className='fixed bottom-6 right-6'>
                    <Tooltip title="Create post" placement="top">
                        <Button
                            className='w-16 h-16'
                            sx={ { backgroundColor: '#1976d2', color: 'white', borderRadius: '100%' } }
                            onClick={ onDialogOpenClickHandler }
                        >
                            <AddIcon size={ 32 } />
                        </Button>
                    </Tooltip>
                </div>

                <PostDialog />
            </div>
            <Snackbar
                open={ isToastVisible }
                autoHideDuration={ 3000 }
                onClose={ () => setIsToastVisible(false) }
                message="The post was created or updated succesfully!"
            />
        </>
    );
};
