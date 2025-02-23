import { createContext, useContext, useState } from 'react';
import { defaultPost, PostModel } from '../models/post-model';
import { AppBaseProviderProps } from '../models/app-base-provider-props';

export type AppSharedContextModel = {
    isDialogVisible: boolean;
    setIsDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
    isConfirmationDialogVisible: boolean;
    setIsConfirmationDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
    posts: PostModel[];
    setPosts: React.Dispatch<React.SetStateAction<PostModel[]>>;
    currentPostId?: number;
    setCurrentPostId: React.Dispatch<React.SetStateAction<number | undefined>>;
    isToastVisible: boolean;
    setIsToastVisible: React.Dispatch<React.SetStateAction<boolean>>;
    isDrawerOpen: boolean;
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSmallScreen: boolean;
    setIsSmallScreen: React.Dispatch<React.SetStateAction<boolean>>
    imageSrc: string | undefined;
    setImageSrc: React.Dispatch<React.SetStateAction<string | undefined>>;
    isImageVisible: boolean;
    setIsImageVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppSharedContext = createContext({} as AppSharedContextModel);

function AppSharedContextProvider(props: AppBaseProviderProps) {
    const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
    const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] = useState<boolean>(false);
    const [posts, setPosts] = useState<PostModel[]>([]);
    const [currentPostId, setCurrentPostId] = useState<number>();
    const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState<string | undefined>();
    const [isImageVisible, setIsImageVisible] = useState(false);
    const [isSmallScreen, setIsSmallScreen,] = useState(false);

    return (
        <AppSharedContext.Provider
            value={{
                isDialogVisible,
                setIsDialogVisible,
                isConfirmationDialogVisible,
                setIsConfirmationDialogVisible,
                posts,
                setPosts,
                currentPostId,
                setCurrentPostId,
                isDrawerOpen,
                setIsDrawerOpen,
                isToastVisible,
                setIsToastVisible,
                isSmallScreen,
                setIsSmallScreen,
                imageSrc,
                setImageSrc,
                isImageVisible,
                setIsImageVisible,
            }}
            {...props}
        />
    );
}

const useAppSharedContext = () => useContext(AppSharedContext);

export { AppSharedContextProvider, useAppSharedContext };
