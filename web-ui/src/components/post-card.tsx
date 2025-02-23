import { useCallback, useState } from 'react';
import { Box, Dialog, IconButton, ImageListItem, Menu } from '@mui/material';
import { useAppDataContext } from '../contexts/app-data-context';
import { MdMoreVert as MoreIcon } from 'react-icons/md';
import { useAppSharedContext } from '../contexts/app-shared-context';
import { PostModel } from '../models/post-model';
import { ConfirmationDialog } from '../components/dialogs/confirmation-dialog';
import { PostActions } from './post-actions';

export const PostCard = ({ post }: { post: PostModel }) => {
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(menuAnchor);

    const { isSmallScreen } = useAppSharedContext();

    const onOpenMenuClickHandler = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            setMenuAnchor(event.currentTarget);
        },
        [setMenuAnchor],
    );

    const onCloseMenuClickHandler = useCallback(() => {
        setMenuAnchor(null);
    }, [setMenuAnchor]);

    return (
        <Box
            sx={{
                minHeight: 260,
                p: 2,
                borderRadius: 2,
                borderColor: 'white',
                boxShadow: 3,
                backgroundColor: 'background.paper',
                color: 'text.primary',
            }}
            className="flex flex-col sm:w-[500px] md:w-[550px] xl:w-[600px] min-h-[260px] p-6 rounded-lg shadow-md bg-white"
        >
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
                <Box sx={{color: 'text.primary'}} className="h-[150px] overflow-auto">{post.message}</Box>
            </div>

            <ConfirmationDialog post={post} />
        </Box>
    );
};
