import { MdMenuOpen as OpenedDrawerIcon } from 'react-icons/md';
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useAppSharedContext } from '../contexts/app-shared-context';

export const TemporaryDrawer = () => {
    const { isDrawerOpen, setIsDrawerOpen } = useAppSharedContext();

    const DrawerList = (
        <div className='w-[280px] p-2'>
            <IconButton className="h-14 w-14" onClick={() => setIsDrawerOpen(false)}>
                <OpenedDrawerIcon className="h-8 w-8" />
            </IconButton>

            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div className="flex w-[350px] justify-start">
            <Drawer variant="persistent" open={isDrawerOpen}>
                {DrawerList}
            </Drawer>
        </div>
    );
};
