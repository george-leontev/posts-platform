import { useCallback, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Button, Dialog, IconButton, ImageListItem } from '@mui/material';
import { useAppDataContext } from '../contexts/app-data-context';
import { MdDeleteSweep as DeleteIcon } from 'react-icons/md';
import { MdOutlineModeEdit as EditIcon } from 'react-icons/md';
import { MdImage as ImageIcon } from 'react-icons/md';
import { useAppSharedContext } from '../contexts/app-shared-context';
import { PostModel } from '../models/post-model';

export const PostCard = ({ post }: { post: PostModel }) => {
    const [imageVisibility, setImageVisibility] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | undefined>();
    const { downloadMediaFileAsync, deletePostAsync } = useAppDataContext();
    const { setPosts, setIsDialogVisible } = useAppSharedContext();

    const onImageClickHandler = useCallback(() => {
        setImageVisibility(false);
    }, []);

    const toggleImageHandler = () => {
        setImageVisibility((prev) => !prev);
    };

    const showImageHandler = useCallback(async () => {
        if (post.uploadedFiles && post.uploadedFiles.length > 0) {
            const response = await downloadMediaFileAsync(post.uploadedFiles[0].id);

            setImageSrc(`data:image/png;base64,${response?.data}`);
        }

    }, [downloadMediaFileAsync, post.uploadedFiles])

    const deletePostHandler = useCallback(async () => {
        const deletedPost = await deletePostAsync(post.id);

        if (deletedPost) {
            setPosts(prevPosts => prevPosts.filter((post) => {
                return post.id !== deletedPost.id;
            }));
        }
    }, [deletePostAsync, post.id, setPosts]);

    const onDialogEditingClickHandler = useCallback(() => {
        setIsDialogVisible(true);
    }, [setIsDialogVisible]);

    const editPostHandler = useCallback(async () => {
        const editedPost = await deletePostAsync(post.id);

        if (editedPost) {
            setPosts(prevPosts => prevPosts.filter((post) => {
                return post.id !== editedPost.id;
            }));
        }
    }, [deletePostAsync, post.id, setPosts]);

    return (
        <div className="flex flex-col w-[600px] h-[260px] p-6 bg-white rounded-lg shadow-md">
            <div className='flex flex-col gap-6'>
                <div className="flex items-center w-full">
                    <h2 className='flex flex-1 text-xl font-bold'>{post.topic}</h2>
                    <div className='flex'>
                        <IconButton
                            className='w-[48px] h-[48px]'
                            sx={ { borderRadius: '100%', color: 'black' } }
                            onClick={ deletePostHandler }
                        >
                            <DeleteIcon size={ 20 } />
                        </IconButton>

                        <IconButton
                            className='w-[48px] h-[48px]'
                            sx={ { borderRadius: '100%', color: 'black' } }
                            onClick={ onDialogEditingClickHandler }
                        >
                            <EditIcon size={ 20 } />
                        </IconButton>

                        <IconButton
                            className='w-[48px] h-[48px]'
                            sx={ { borderRadius: '100%', color: 'black' } }
                            onClick={ onDialogEditingClickHandler }
                        >
                            <ImageIcon size={ 20 } />
                        </IconButton>
                    </div>
                </div>
                <div className=" max-h-[125px] overflow-auto text-gray-700">{post.message}</div>
            </div>

            <div className='flex flex-col h-full justify-end'>
                <Dialog open={ imageVisibility } onClose={ onImageClickHandler } className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
                    <ImageListItem>
                        <img
                            src={ imageSrc }
                        />
                    </ImageListItem>
                </Dialog>

                <Button
                    variant='outlined'
                    onClick={ () => {
                        toggleImageHandler();
                        showImageHandler();
                        setImageVisibility(true);
                    }
                    }
                    className="flex items-center text-blue-500 hover:underline"
                >
                    <FaEye className="mr-2" />
                    {imageVisibility ? 'Hide Image' : 'Show Image'}
                </Button>
            </div>

        </div>
    );
}
