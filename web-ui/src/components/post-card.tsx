import { useCallback, useState } from 'react';
import { Dialog, IconButton, ImageListItem } from '@mui/material';
import { useAppDataContext } from '../contexts/app-data-context';
import { MdDeleteSweep as DeleteIcon, MdOutlineModeEdit as EditIcon, MdImage as ImageIcon } from 'react-icons/md';
import { useAppSharedContext } from '../contexts/app-shared-context';
import { PostModel } from '../models/post-model';
import { ConfirmationDialog } from '../dialogs/confirmation-dialog';

export const PostCard = ({ post }: { post: PostModel }) => {
    const [isImageVisible, setIsImageVisible] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | undefined>();
    const { getUploadedFileAsync, getAllUploadedFilesAsync } = useAppDataContext();
    const { setIsDialogVisible, setCurrentPostId, setIsConfirmationDialogVisible } = useAppSharedContext();

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
    }, [getAllUploadedFilesAsync, getUploadedFileAsync, post.id]);

    const onEditPostHandler = useCallback(async () => {
        setCurrentPostId(post.id!);
        setIsDialogVisible(true);
    }, [post.id, setCurrentPostId, setIsDialogVisible]);

    return (
        <div className="flex flex-col w-[600px] h-[260px] p-6 rounded-lg shadow-md bg-white">
            <div className="flex flex-col gap-6">
                <div className="flex items-center w-full">
                    <div className="flex flex-1 flex-col">
                        <p className="text-[#8c8c91] cursor-pointer hover:text-gray-600">{post.author.username}</p>
                        <p className="text-xl font-bold">{post.topic}</p>
                    </div>
                    <div className="flex">
                        <IconButton
                            className="w-[48px] h-[48px]"
                            sx={{ borderRadius: '100%', color: 'black' }}
                            onClick={() => setIsConfirmationDialogVisible(true)}
                        >
                            <DeleteIcon size={20} />
                        </IconButton>

                        <IconButton
                            className="w-[48px] h-[48px]"
                            sx={{ borderRadius: '100%', color: 'black' }}
                            onClick={onEditPostHandler}
                        >
                            <EditIcon size={20} />
                        </IconButton>

                        {post.uploadedFiles && post.uploadedFiles.length > 0 ? (
                            <IconButton
                                className="w-[48px] h-[48px]"
                                sx={{ borderRadius: '100%', color: 'black' }}
                                onClick={onShowImageClickHandler}
                            >
                                <ImageIcon size={20} />
                            </IconButton>
                        ) : null}
                    </div>
                </div>
                <div className=" max-h-[125px] overflow-auto text-gray-700">{post.message}</div>
            </div>

            <div className="flex flex-col h-full justify-end">
                <Dialog
                    open={isImageVisible}
                    onClose={onCloseImageClickHandler}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
                >
                    <ImageListItem>
                        <img src={imageSrc} />
                    </ImageListItem>
                </Dialog>
            </div>

            <ConfirmationDialog post={post} />
        </div>
    );
};
