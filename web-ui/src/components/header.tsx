import { CgProfile as ProfileIcon } from 'react-icons/cg';
import { MdOutlineMenu as ClosedDrawerIcon } from 'react-icons/md';
import { IconButton, TextField } from '@mui/material';
import { useAppSharedContext } from '../contexts/app-shared-context';

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
        <div className="flex pb-5">
            <IconButton className="flex justify-center items-center" onClick={() => setIsDrawerOpen(true)}>
                <ClosedDrawerIcon className={`h-8 w-8 ${isDrawerOpen ? 'collapse' : 'flex'}`} />
            </IconButton>

            <div className="flex w-full">
                <div
                    className={`flex flex-1 justify-center items-center transition-all duration-500 ${isDrawerOpen ? 'pl-[280px]' : 'pl-0'}`}
                >
                    <TextField
                        className="sm:w-[500px] lg:w-[550px] xl:w-[600px]"
                        label="What do you want to find?"
                        variant="outlined"
                        size="small"
                    />
                </div>

                <IconButton>
                    <ProfileIcon color="#757575" className="h-8 w-8" />
                </IconButton>
            </div>
        </div>
    );
};
