import axios from "axios";
import { createContext, useCallback, useContext } from "react";
import { PostModel } from "../models/post-model";
import { useAuthHttpRequest } from "./use-auth-http-request";
import routes from '../constants/app-api-routes';

export type AppDataContextModel = {
    getPostsAsync: () => Promise<PostModel[] | undefined>,
    addPostAsync: (post: PostModel) => Promise<PostModel | undefined>
}

const AppDataContext = createContext({} as AppDataContextModel);

export type AppDataContextProviderProps = object


function AppDataContextProvider(props: AppDataContextProviderProps) {
    const authHttpRequest  = useAuthHttpRequest();
    const getPostsAsync = useCallback(async () => {
        try {
            const response = await authHttpRequest({
                method: 'GET',
                url: routes.posts,
            });

            if (response && response.status === 200) {
                return response.data as PostModel[];
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const addPostAsync = useCallback(async (post: PostModel) => {
        try {
            const response = await authHttpRequest({
                method: 'POST',
                url: routes.posts,
                data: post
            });

            if (response && response.status === 200) {
                return response.data as PostModel;
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    return <AppDataContext.Provider {...props} value={{ getPostsAsync, addPostAsync }} />
}

const useAppDataContext = () => useContext(AppDataContext);

export { AppDataContextProvider, useAppDataContext };