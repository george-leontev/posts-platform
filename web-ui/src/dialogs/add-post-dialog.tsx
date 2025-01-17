import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Snackbar } from '@mui/material';
import { useAppSharedContext } from '../contexts/app-shared-context';
import { useCallback, useState } from 'react';
import { useAppDataContext } from '../contexts/app-data-context';
import { PostModel } from '../models/post-model';

export const AddPostDialog = () => {
    const [message, setMessage] = useState<string>('');
    const [topic, setTopic] = useState<string>('');
    const [toastVisibility, setToastVisibility] = useState<boolean>(false);
    const { addPostAsync } = useAppDataContext();
    const { setPosts, setIsDialogVisible, isDialogVisible } = useAppSharedContext();

    const onDialogCloseClickHandler = useCallback(() => {
        setIsDialogVisible(false);
    }, [setIsDialogVisible]);

    const onAddPostClickHandler = useCallback(
        async () => {
            if (message.trim() && topic.trim()) {
                const newPost = {
                    topic: topic,
                    message: message,
                };

                const createdPost = await addPostAsync(newPost as PostModel);
                if (createdPost) {
                    setPosts(prevPosts => [...prevPosts, createdPost]);
                }
            }
        }, [addPostAsync, message, setPosts, topic]);

    return (
        <Dialog open={ isDialogVisible } onClose={ onDialogCloseClickHandler }>
            <DialogTitle>Add your own post</DialogTitle>
            <DialogContent className='flex flex-col gap-6 w-[500px]'>
                <TextField
                    label="Topic"
                    variant="outlined"
                    value={ topic }
                    onChange={ (e) => setTopic(e.target.value) }
                    fullWidth
                />
                <TextField
                    label="What's on your mind?"
                    variant="outlined"
                    value={ message }
                    onChange={ (e) => setMessage(e.target.value) }
                    fullWidth
                    multiline
                    rows={ 4 }
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    color="error"
                    onClick={ onDialogCloseClickHandler }
                >
                    Cancel
                </Button>

                <Button
                    variant='contained'
                    color="success"
                    onClick={ () => {
                        onAddPostClickHandler();
                        onDialogCloseClickHandler();
                        setToastVisibility(true);
                    } }
                >
                    Confirm
                </Button>
                <Snackbar
                    open={ toastVisibility }
                    autoHideDuration={ 4000 }
                    message="The post was created succesfully!"
                />
            </DialogActions>
        </Dialog>
    );
}