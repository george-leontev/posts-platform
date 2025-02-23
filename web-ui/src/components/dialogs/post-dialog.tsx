import { Dialog, DialogContent, TextField, DialogActions, Button,  Input, Typography } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { useAppDataContext } from '../../contexts/app-data-context';
import { useAppSharedContext } from '../../contexts/app-shared-context';
import { PostModel, defaultPost } from '../../models/post-model';

export const PostDialog = () => {
    const [fileName, setFileName] = useState<string>('');
    const [post, setPost] = useState<PostModel>(defaultPost);

    const { getPostAsync, addPostAsync, updatePostAsync, addUploadedFileAsync } = useAppDataContext();
    const { setPosts, setIsDialogVisible, isDialogVisible, setCurrentPostId, currentPostId, setIsToastVisible } = useAppSharedContext();

    useEffect(() => {
        if (currentPostId) {
            (async () => {
                const post = await getPostAsync(currentPostId);
                if (post) {
                    setPost(post)
                }
            })();
        }
    }, [currentPostId, getPostAsync]);

    const onCloseClickHandler = useCallback(() => {
        setIsDialogVisible(false);
        setFileName('');
        setCurrentPostId(undefined);
        setPost(defaultPost);
    }, [setCurrentPostId, setIsDialogVisible]);

    const uploadAsync = useCallback(async (postId: number) => {
        const fileUploadForm = document.getElementById('file-upload-form');
        if (fileUploadForm) {
            const formData = new FormData(fileUploadForm as HTMLFormElement);
            const fileUploadElement = document.getElementById('file-upload') as HTMLInputElement;
            if (fileUploadElement && fileUploadElement.files!.length > 0) {
                return await addUploadedFileAsync(postId, formData);
            }
        }
    }, [addUploadedFileAsync]);

    const onConfirmPostClickHandler = useCallback(
        async () => {
            onCloseClickHandler();

            let createdOrUpdatedPost: PostModel | undefined;

            if (post.message.trim() && post.topic.trim()) {
                createdOrUpdatedPost = currentPostId
                    ? await updatePostAsync(post)
                    : await addPostAsync({
                        topic: post.topic,
                        message: post.message
                    } as PostModel);

                if (!createdOrUpdatedPost) {
                    return;
                }

                const uploadedFile = await uploadAsync(createdOrUpdatedPost.id);
                if (uploadedFile) {
                    createdOrUpdatedPost.uploadedFiles = createdOrUpdatedPost.uploadedFiles ? createdOrUpdatedPost.uploadedFiles : [];
                    createdOrUpdatedPost.uploadedFiles = [...createdOrUpdatedPost.uploadedFiles!, { id: uploadedFile!.id }];
                }

                if (currentPostId) {
                    setPosts(prevPosts => {
                        return [
                            ...prevPosts.filter((post) => {
                                return post.id !== createdOrUpdatedPost!.id;
                            }), createdOrUpdatedPost!]
                    });
                } else {
                    setPosts(prevPosts => [...prevPosts, createdOrUpdatedPost!]);
                }
                setIsToastVisible(true);
            }
        }, [addPostAsync, currentPostId, onCloseClickHandler, post, setIsToastVisible, setPosts, updatePostAsync, uploadAsync]);

    const addPostFileHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            setFileName(selectedFile.name);
        }
    }, []);

    return (
        <Dialog open={ isDialogVisible } onClose={ onCloseClickHandler }>
            <Typography className='flex items-center h-12 p-7 font-bold' variant='h5'>Add your own post</Typography>
            <DialogContent className='flex flex-col gap-6 w-[500px]'>
                <TextField
                    label="Topic"
                    variant="outlined"
                    value={ post.topic }
                    onChange={ (e) => setPost(prev => { return { ...prev, topic: e.target.value } }) }
                    fullWidth
                />
                <TextField
                    label="What's on your mind?"
                    variant="outlined"
                    value={ post.message }
                    onChange={ (e) => setPost(prev => { return { ...prev, message: e.target.value } }) }
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
                            inputProps={ { accept: 'image/*' } }
                            onChange={ addPostFileHandler }
                            style={ { display: 'none' } }
                        />
                        <label htmlFor="file-upload">
                            <Button sx={{color: 'white'}} variant="outlined" component="span">
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
                    onClick={ onCloseClickHandler }
                >
                    Cancel
                </Button>

                <Button
                    variant='contained'
                    color="success"
                    onClick={ onConfirmPostClickHandler }
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}