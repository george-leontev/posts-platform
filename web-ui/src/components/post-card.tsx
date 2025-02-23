import { useCallback, useState } from 'react';
import { Dialog, IconButton, ImageListItem, Menu } from '@mui/material';
import { useAppDataContext } from '../contexts/app-data-context';
import { MdMoreVert as MoreIcon } from 'react-icons/md';
import { useAppSharedContext } from '../contexts/app-shared-context';
import { PostModel } from '../models/post-model';
import { ConfirmationDialog } from '../components/dialogs/confirmation-dialog';
import { PostActions } from './post-actions';

export const PostCard = ({ post }: { post: PostModel }) => {
    const [isImageVisible, setIsImageVisible] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(menuAnchor);

    const { isSmallScreen, imageSrc } = useAppSharedContext();

    const onOpenMenuClickHandler = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            setMenuAnchor(event.currentTarget);
        },
        [setMenuAnchor],
    );

    const onCloseMenuClickHandler = useCallback(() => {
        setMenuAnchor(null);
    }, [setMenuAnchor]);

    const onCloseImageClickHandler = useCallback(() => {
        setIsImageVisible(false);
    }, [setIsImageVisible]);

    return (
        <div className="flex flex-col sm:w-[500px] lg:w-[550px] 2xl:w-[600px] min-h-[260px] p-6 rounded-lg shadow-md bg-white">
            <div className="flex flex-col gap-6 ">
                <div className="flex items-center w-full">
                    <div className="flex flex-1 flex-col">
                        <p className="text-[#8c8c91] cursor-pointer hover:text-gray-600">{post.author.username}</p>
                        <p className="text-xl font-bold">{post.topic}</p>
                    </div>
                    {isSmallScreen ? (
                        <div>
                            <IconButton
                                className="w-[48px] h-[48px]"
                                sx={{ borderRadius: '100%', color: 'black' }}
                                onClick={onOpenMenuClickHandler}
                            >
                                <MoreIcon size={20} />
                            </IconButton>
                            <Menu open={isMenuOpen} onClose={onCloseMenuClickHandler} anchorEl={menuAnchor}>
                                <PostActions post={post} />
                            </Menu>
                        </div>
                    ) : (
                        <div className="flex flex-col md:flex-row">
                            <PostActions post={post} />
                        </div>
                    )}
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
