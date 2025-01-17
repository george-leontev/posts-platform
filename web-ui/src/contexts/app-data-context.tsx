import { createContext, useCallback, useContext } from 'react';
import { PostModel } from '../models/post-model';
import { useAuthHttpRequest } from './use-auth-http-request';
import routes from '../constants/app-api-routes';
import { HttpConstants } from '../constants/app-http-constants';

export type AppDataContextModel = {
    getPostsAsync: () => Promise<PostModel[] | undefined>,
    addPostAsync: (post: PostModel) => Promise<PostModel | undefined>
}

const AppDataContext = createContext({} as AppDataContextModel);

export type AppDataContextProviderProps = object


function AppDataContextProvider(props: AppDataContextProviderProps) {
    const authHttpRequest = useAuthHttpRequest();
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
    }, [authHttpRequest]);

    const addPostAsync = useCallback(async (post: PostModel) => {
        try {
            const response = await authHttpRequest({
                method: 'POST',
                url: routes.posts,
                data: post
            });

            if (response && response.status === HttpConstants.StatusCodes.Created) {
                return response.data as PostModel;
            }
        } catch (error) {
            console.log(error);
        }
    }, [authHttpRequest]);

    return <AppDataContext.Provider { ...props } value={ { getPostsAsync, addPostAsync } } />
}

const useAppDataContext = () => useContext(AppDataContext);

export { AppDataContextProvider, useAppDataContext };