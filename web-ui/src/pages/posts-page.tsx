import { useEffect, useState } from 'react';
import { PostModel } from '../models/post-model';
import { useAppDataContext } from '../contexts/app-data-context';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const PostsPage = () => {
    const [posts, setPosts] = useState<PostModel[]>([]);
    const { getPostsAsync } = useAppDataContext();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        (async () => {
            const posts = await getPostsAsync();
            debugger;

            if (posts) {
                setPosts(posts);
            }
        })();
    }, [getPostsAsync]);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <div className="flex flex-col w-full items-center gap-6 p-4">
                {posts.map((post) => {
                    return (
                        <div
                            key={post.id}
                            className="flex flex-col gap-6 w-full h-48 max-w-md p-6 bg-white rounded-lg shadow-md"
                        >
                            <h2 className="text-xl font-bold">{post.topic}</h2>
                            <p className="text-gray-700">{post.message}</p>
                        </div>
                    );
                })}
            </div>

            <div className='absolute bottom-4 right-4'>
                <Button className='w-14 h-14' sx={{ backgroundColor: '#1976d2', color: 'white', borderRadius: '100%' }} onClick={handleClickOpen}>
                    <AddIcon className='' />
                </Button>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add your own post</DialogTitle>
                <DialogContent className='flex flex-col gap-6 w-[500px]'>
                    <TextField
                        label="Topic"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        label="What's on your mind?"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button variant='contained' onClick={handleClose} color="success">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
