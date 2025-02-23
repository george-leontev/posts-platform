import { MdMenuOpen as OpenedDrawerIcon } from 'react-icons/md';
import { TbHome as HomeIcon } from 'react-icons/tb';
import { TbSearch as SearchIcon } from 'react-icons/tb';
import { LuMessagesSquare as MessageIcon } from 'react-icons/lu';
import { TbMessage2Heart as NotificationIcon } from 'react-icons/tb';
import { RiFunctionAddLine as CreateIcon } from 'react-icons/ri';
import { CgProfile as ProfileIcon } from 'react-icons/cg';
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useAppSharedContext } from '../contexts/app-shared-context';
import { useCallback, useEffect } from 'react';

export const TemporaryDrawer = () => {
    const { isDrawerOpen, setIsDrawerOpen, isSmallScreen, setIsSmallScreen } = useAppSharedContext();

    const checkScreenSize = useCallback(() => {
        const screenWidth = window.innerWidth;
        const smallScreen = screenWidth < 990;

        setIsSmallScreen(smallScreen);
        setIsDrawerOpen(!smallScreen);
    }, [setIsDrawerOpen, setIsSmallScreen]);

    useEffect(() => {
        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, [checkScreenSize]);

    const drawerItems = [
        { text: 'Home', icon: <HomeIcon /> },
        { text: 'Search', icon: <SearchIcon /> },
        { text: 'Messages', icon: <MessageIcon /> },
        { text: 'Notifications', icon: <NotificationIcon /> },
        { text: 'Create', icon: <CreateIcon /> },
        { text: 'Profile', icon: <ProfileIcon /> },
    ];

    return (
        <Drawer
            variant={isSmallScreen ? 'temporary' : 'persistent'}
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
        >
            <div className="w-[280px] p-2">
                <IconButton className="h-14 w-14" onClick={() => setIsDrawerOpen(false)}>
                    <OpenedDrawerIcon className="h-8 w-8" />
                </IconButton>

                <List>
                    {drawerItems.map(({ text, icon }) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton className="flex gap-3 text-xl">
                                {icon}
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Settings', 'About us', 'Security'].map((text) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </div>
        </Drawer>
    );
};
