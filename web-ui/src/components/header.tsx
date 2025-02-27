import { CgProfile as ProfileIcon } from 'react-icons/cg';
import { MdOutlineMenu as ClosedDrawerIcon } from 'react-icons/md';
import { IconButton, TextField } from '@mui/material';
import { useAppSharedContext } from '../contexts/app-shared-context';

interface HeaderProps {
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    searchQuery: string;
}

export const Header = ({ onSearchChange, searchQuery }: HeaderProps) => {
    const { setIsDrawerOpen, isDrawerOpen, isSmallScreen } = useAppSharedContext();

    return (
        <div className="flex pb-5">
            <IconButton className="flex justify-center items-center" onClick={() => setIsDrawerOpen(true)}>
                <ClosedDrawerIcon className={`h-8 w-8 ${isDrawerOpen ? 'collapse' : 'flex'}`} />
            </IconButton>

            <div className="flex w-full">
                <div
                    className={`flex flex-1 justify-center items-center transition-all duration-500 ${(isDrawerOpen && !isSmallScreen) ? 'pl-[280px]' : 'pl-0'}`}
                >
                    <TextField
                        className="sm:w-[500px] lg:w-[550px] xl:w-[600px]"
                        label="What do you want to find?"
                        variant="outlined"
                        onChange={onSearchChange}
                        value={searchQuery}
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
