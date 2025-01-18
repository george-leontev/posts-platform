import { useCallback, useState } from 'react';
import { Dialog, IconButton, ImageListItem } from '@mui/material';
import { useAppDataContext } from '../contexts/app-data-context';
import { MdDeleteSweep as DeleteIcon, MdOutlineModeEdit as EditIcon, MdImage as ImageIcon } from 'react-icons/md';
import { useAppSharedContext } from '../contexts/app-shared-context';
import { PostModel } from '../models/post-model';

export const PostCard = ({ post }: { post: PostModel }) => {
    const [isImageVisible, setIsImageVisible] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | undefined>();
    const { getUploadedFileAsync, deletePostAsync, getAllUploadedFilesAsync } = useAppDataContext();
    const { setPosts, setIsDialogVisible, setCurrentPostId } = useAppSharedContext();

    const onCloseImageClickHandler = useCallback(() => {
        setIsImageVisible(false);
    }, []);

    const onShowImageClickHandler = useCallback(async () => {
        const mediaFiles = await getAllUploadedFilesAsync(post.id);

        if (mediaFiles && mediaFiles.length > 0) {
            const imageBase64 = await getUploadedFileAsync(mediaFiles.find(() => true)!.id);
            if (imageBase64) {
                setImageSrc(`data:image/png;base64,${imageBase64}`);
                setIsImageVisible(true);
            }
        }
    }, [getAllUploadedFilesAsync, getUploadedFileAsync, post.id])

    const onDeletePostClickHandler = useCallback(async () => {
        const deletedPost = await deletePostAsync(post.id!);

        if (deletedPost) {
            setPosts(prevPosts => prevPosts.filter((post) => {
                return post.id !== deletedPost.id;
            }));
        }
    }, [deletePostAsync, post.id, setPosts]);

    const onEditPostHandler = useCallback(async () => {
        setCurrentPostId(post.id!);
        setIsDialogVisible(true);
    }, [post.id, setCurrentPostId, setIsDialogVisible]);

    return (
        <div className="flex flex-col w-[600px] h-[260px] p-6 bg-white rounded-lg shadow-md">
            <div className='flex flex-col gap-6'>
                <div className="flex items-center w-full">
                    <h2 className='flex flex-1 text-xl font-bold'>{post.topic}</h2>
                    <div className='flex'>
                        <IconButton
                            className='w-[48px] h-[48px]'
                            sx={ { borderRadius: '100%', color: 'black' } }
                            onClick={ onDeletePostClickHandler }
                        >
                            <DeleteIcon size={ 20 } />
                        </IconButton>

                        <IconButton
                            className='w-[48px] h-[48px]'
                            sx={ { borderRadius: '100%', color: 'black' } }
                            onClick={ onEditPostHandler }
                        >
                            <EditIcon size={ 20 } />
                        </IconButton>

                        {(post.uploadedFiles && post.uploadedFiles.length > 0) ?
                            <IconButton
                                className='w-[48px] h-[48px]'
                                sx={ { borderRadius: '100%', color: 'black' } }
                                onClick={ onShowImageClickHandler }
                            >
                                <ImageIcon size={ 20 } />
                            </IconButton>
                            : null
                        }
                    </div>
                </div>
                <div className=" max-h-[125px] overflow-auto text-gray-700">{post.message}</div>
            </div>

            <div className='flex flex-col h-full justify-end'>
                <Dialog open={ isImageVisible } onClose={ onCloseImageClickHandler } className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
                    <ImageListItem>
                        <img
                            src={ imageSrc }
                        />
                    </ImageListItem>
                </Dialog>

            </div>

        </div>
    );
}
