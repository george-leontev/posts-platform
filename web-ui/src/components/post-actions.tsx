import { IconButton } from '@mui/material';
import { MdDeleteSweep as DeleteIcon, MdOutlineModeEdit as EditIcon, MdImage as ImageIcon } from 'react-icons/md';
import { useAppSharedContext } from '../contexts/app-shared-context';
import { PostModel } from '../models/post-model';
import { useAppDataContext } from '../contexts/app-data-context';
import { useCallback } from 'react';

interface PostActionsProps {
    post: PostModel;
}

export const PostActions = ({ post }: PostActionsProps) => {
    const { setIsDialogVisible, setCurrentPostId, setIsConfirmationDialogVisible, setImageSrc, setIsImageVisible } =
        useAppSharedContext();

    const { getUploadedFileAsync, getAllUploadedFilesAsync } = useAppDataContext();

    const onEditPostHandler = useCallback(async () => {
        setCurrentPostId(post.id!);
        setIsDialogVisible(true);
    }, [post.id, setCurrentPostId, setIsDialogVisible]);

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

    return (
        <div>
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
    );
};
