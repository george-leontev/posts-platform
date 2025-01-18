import { createContext, useContext, useState } from 'react';
import { PostModel } from '../models/post-model';
import { AppBaseProviderProps } from '../models/app-base-provider-props';

export type AppSharedContextModel = {
    isDialogVisible: boolean,
    setIsDialogVisible: React.Dispatch<React.SetStateAction<boolean>>,
    posts: PostModel[],
    setPosts: React.Dispatch<React.SetStateAction<PostModel[]>>,
    currentPostId?: number,
    setCurrentPostId: React.Dispatch<React.SetStateAction<number | undefined>>,
    isToastVisible: boolean,
    setIsToastVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const AppSharedContext = createContext({} as AppSharedContextModel);

function AppSharedContextProvider(props: AppBaseProviderProps) {
    const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
    const [posts, setPosts] = useState<PostModel[]>([]);
    const [currentPostId, setCurrentPostId] = useState<number>();
    const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

    return <AppSharedContext.Provider value={ {
        isDialogVisible,
        setIsDialogVisible,
        posts,
        setPosts,
        currentPostId,
        setCurrentPostId,
        isToastVisible,
        setIsToastVisible
    } } { ...props } />
}

const useAppSharedContext = () => useContext(AppSharedContext);

export { AppSharedContextProvider, useAppSharedContext }
