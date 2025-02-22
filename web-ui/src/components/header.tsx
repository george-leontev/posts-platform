import { CgProfile as ProfileIcon } from 'react-icons/cg';
import { MdOutlineMenu as ClosedDrawerIcon } from 'react-icons/md';
import { IconButton, TextField } from '@mui/material';
import { useAppSharedContext } from '../contexts/app-shared-context';

export const Header = () => {
    const { setIsDrawerOpen } = useAppSharedContext();

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
            <IconButton onClick={() => setIsDrawerOpen(true)}>
                <ClosedDrawerIcon className="h-8 w-8" />
            </IconButton>

            <div className="flex justify-center items-center w-full pr-3">
                <TextField className='w-[600px]' label="What do you want to find?" variant="outlined" size="small" />
            </div>

            <div className="flex justify-center items-center cursor-pointer">
                <ProfileIcon color="#757575" className="flex h-8 w-8" />
            </div>
        </div>
    );
};
