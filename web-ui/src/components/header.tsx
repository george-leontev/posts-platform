import { CgProfile as ProfileIcon } from 'react-icons/cg';
import { MdOutlineMenu as ClosedDrawerIcon } from 'react-icons/md';
import { IconButton, TextField } from '@mui/material';
import { useAppSharedContext } from '../contexts/app-shared-context';
import { motion } from 'framer-motion';

export const Header = () => {
    const { setIsDrawerOpen, isDrawerOpen } = useAppSharedContext();

    // const onSearchChangeHandler = useCallback(
    //     (event: any) => {
    //         const value = event.target.value.toLowerCase();

    //         const filteredPosts = posts.filter((post) => {
    //             return post.topic.toLowerCase().includes(value) || post.message.toLowerCase().includes(value);
    //         });
    //         setFilteredPosts(filteredPosts);
    //     },
    //     [setFilteredPosts, posts],
    // );

    return (
        <div className="flex pb-5 p-2">
            <motion.div
                initial={{ opacity: isDrawerOpen ? 0 : 1 }} // Hide when drawer is open (opacity 0)
                animate={{ opacity: isDrawerOpen ? 0 : 1 }} // Maintain the state for hiding/showing
                transition={{ delay: isDrawerOpen ? 0 : 0.4, duration: 0 }} // Delay by 2s but no animation
            >
                <IconButton onClick={() => setIsDrawerOpen(true)}>
                    <ClosedDrawerIcon className="h-8 w-8" />
                </IconButton>
            </motion.div>

            <div className="flex justify-center items-center w-full">
                <TextField className="w-[600px]" label="What do you want to find?" variant="outlined" size="small" />
            </div>

            <IconButton>
                <ProfileIcon color="#757575" className="h-8 w-8" />
            </IconButton>
        </div>
    );
};
