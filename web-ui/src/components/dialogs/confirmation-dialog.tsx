import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useCallback } from "react";
import { CiWarning as WarningIcon } from "react-icons/ci";
import { useAppDataContext } from "../../contexts/app-data-context";
import { useAppSharedContext } from "../../contexts/app-shared-context";
import { PostModel } from "../../models/post-model";

interface ConfirmationDialogProps {
    post: PostModel;
}

export const ConfirmationDialog = ({ post }: ConfirmationDialogProps) => {
    const { setPosts, isConfirmationDialogVisible, setIsConfirmationDialogVisible} = useAppSharedContext();
    const { deletePostAsync } = useAppDataContext();

    const onCloseClickHandler = useCallback(() => {
        setIsConfirmationDialogVisible(false);
    }, [setIsConfirmationDialogVisible]);

    const onDeletePostClickHandler = useCallback(async () => {
        const deletedPost = await deletePostAsync(post.id);

        if (deletedPost) {
            setPosts((prevPosts) =>
                prevPosts.filter((post) => {
                    return post.id !== deletedPost.id;
                }),
            );
        }
    }, [deletePostAsync, post.id, setPosts]);

    return (
        <Dialog open={isConfirmationDialogVisible} onClose={onCloseClickHandler}>
            <div className='flex flex-col flex-1'>
                <DialogTitle className="flex flex-1 gap-4 justify-center items-center font-bold border-b border-[#8c8c91]" variant="h5" >
                    <p className="flex flex-1">Confirmation dialog</p>
                    <WarningIcon className="h-10 w-10" />
                </DialogTitle>
                <DialogContent className='mt-4'>Are you sure you want to delete the post?</DialogContent>
            </div>
            <DialogActions>
                <Button variant="contained" color="error" onClick={onCloseClickHandler}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                        onDeletePostClickHandler();
                        onCloseClickHandler();
                    }}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};
