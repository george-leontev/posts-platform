import { Dialog, ImageListItem } from '@mui/material';
import { useCallback } from 'react';
import { useAppSharedContext } from '../../contexts/app-shared-context';

export const ImageDialog = () => {
    const { imageSrc, isImageVisible, setIsImageVisible } = useAppSharedContext();

    const onCloseImageClickHandler = useCallback(() => {
        setIsImageVisible(false);
    }, [setIsImageVisible]);

    return (
        <Dialog
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
            open={isImageVisible}
            onClose={onCloseImageClickHandler}
        >
            <ImageListItem>
                <img src={imageSrc} />
            </ImageListItem>
        </Dialog>
    );
};
