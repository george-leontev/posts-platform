import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Snackbar, Input, Typography } from '@mui/material';
import { useAppSharedContext } from '../contexts/app-shared-context';
import { useCallback, useState } from 'react';
import { useAppDataContext } from '../contexts/app-data-context';
import { PostModel } from '../models/post-model';
import { DialogModes } from '../models/enums/dialog-modes';

export const PostDialog = ({ mode }: {mode: DialogModes}) => {
    const [message, setMessage] = useState<string>('');
    const [topic, setTopic] = useState<string>('');
    const [toastVisibility, setToastVisibility] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>('');
    const { addPostAsync, uploadMediaFileAsync } = useAppDataContext();
    const { setPosts, setIsDialogVisible, isDialogVisible } = useAppSharedContext();
    // const [post, setPost] = useState<PostModel>(mode === DialogModes.edit && newPost ? { ...newPost } : {
    //     id: 0,
    //     topic: '',
    //     message: '',
    // } as PostModel);


    const onDialogCloseClickHandler = useCallback(() => {
        setIsDialogVisible(false);
        setFileName('');
        setTopic('');
        setMessage('');
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
                    const fileUploadForm = document.getElementById('file-upload-form');
                    if (fileUploadForm) {
                        const formData = new FormData(fileUploadForm as HTMLFormElement);
                        const fileUploadElement = document.getElementById('file-upload') as HTMLInputElement;
                        if (fileUploadElement && fileUploadElement.files!.length > 0) {
                            await uploadMediaFileAsync(createdPost.id, formData)
                        }
                    }
                }
                if (createdPost) {
                    setPosts(prevPosts => [...prevPosts, createdPost]);
                }
            }
        }, [addPostAsync, message, setPosts, topic, uploadMediaFileAsync]);

    const addPostFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {

            const selectedFile = event.target.files[0];
            setFileName(selectedFile.name);
        }
    };

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

                <div className={ 'flex flex-col gap-4' }>
                    <form id="file-upload-form" encType="multipart/form-data">
                        <Input
                            type="file"
                            id="file-upload"
                            name="fileUpload"
                            inputProps={ { accept: 'image/*,video/*' } }
                            onChange={ addPostFileHandler }
                            style={ { display: 'none' } }
                        />
                        <label htmlFor="file-upload">
                            <Button variant="contained" component="span">
                                Choose File
                            </Button>
                        </label>
                    </form>
                    {fileName && <Typography variant="body1">{fileName}</Typography>}
                </div>
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