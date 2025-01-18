import { createContext, useContext, useState } from 'react';
import { PostModel } from '../models/post-model';
import { AppBaseProviderProps } from '../models/app-base-provider-props';

export type AppSharedContextModel = {
    isDialogVisible: boolean,
    setIsDialogVisible: React.Dispatch<React.SetStateAction<boolean>>,
    posts: PostModel[],
    setPosts: React.Dispatch<React.SetStateAction<PostModel[]>>
}

const AppSharedContext = createContext({} as AppSharedContextModel);

function AppSharedContextProvider(props: AppBaseProviderProps) {
    const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
    const [posts, setPosts] = useState<PostModel[]>([]);
    

    return <AppSharedContext.Provider value={ {
        isDialogVisible,
        setIsDialogVisible,
        posts,
        setPosts
    } } { ...props } />
}

const useAppSharedContext = () => useContext(AppSharedContext);

export { AppSharedContextProvider, useAppSharedContext }
