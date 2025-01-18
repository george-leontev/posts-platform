import { createContext, useCallback, useContext } from 'react';
import { PostModel } from '../models/post-model';
import { useAuthHttpRequest } from './use-auth-http-request';
import routes from '../constants/app-api-routes';
import { HttpConstants } from '../constants/app-http-constants';
import { AxiosResponse } from 'axios';

export type AppDataContextModel = {
    getPostsAsync: () => Promise<PostModel[] | undefined>,
    addPostAsync: (post: PostModel) => Promise<PostModel | undefined>,
    uploadMediaFileAsync: (postId: number, formData: FormData) => Promise<PostModel | undefined>,
    downloadMediaFileAsync: (id: number) => Promise<AxiosResponse<any, any> | undefined>,
    deletePostAsync: (id: number) => Promise<any>,
    editPostAsync: (id: number) => Promise<any>
}

const AppDataContext = createContext({} as AppDataContextModel);

export type AppDataContextProviderProps = object


function AppDataContextProvider(props: AppDataContextProviderProps) {
    const authHttpRequest = useAuthHttpRequest();

    const getPostsAsync = useCallback(async () => {
        try {
            const response = await authHttpRequest({
                method: 'GET',
                url: routes.posts
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
                method: HttpConstants.Methods.Post,
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

    const editPostAsync = useCallback(async (id: number) => {
        try {
            const response = await authHttpRequest({
                method: HttpConstants.Methods.Put,
                url: `${routes.posts}/${id}`
            });

            if (response && response.status === HttpConstants.StatusCodes.Ok) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }, [authHttpRequest]);

    const deletePostAsync = useCallback(async (id: number) => {
        try {

            const response = await authHttpRequest({
                method: HttpConstants.Methods.Delete,
                url: `${routes.posts}/${id}`
            });

            if (response && response.status === HttpConstants.StatusCodes.Ok) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }, [authHttpRequest]);

    const uploadMediaFileAsync = useCallback(async (postId: number, formData: FormData) => {
        try {
            const response = await authHttpRequest({
                method: HttpConstants.Methods.Post,
                url: `${routes.posts}/upload/${postId}`,
                headers: { 'Content-Type': 'multipart/form-data' },
                data: formData,
            });

            if (response && response.status === HttpConstants.StatusCodes.Created) {
                return response.data as PostModel;
            }
        } catch (error) {
            console.log(error);
        }
    }, [authHttpRequest]);

    const downloadMediaFileAsync = useCallback(async (id: number) => {
        const response = await authHttpRequest({
            url: `${routes.posts}/download/${id}`,
            method: HttpConstants.Methods.Get,
        });

        if (response && response.status === HttpConstants.StatusCodes.Ok) {
            debugger;
            return response;
        }
    }, [authHttpRequest])

    return <AppDataContext.Provider { ...props } value={ { getPostsAsync, addPostAsync, editPostAsync, deletePostAsync, uploadMediaFileAsync, downloadMediaFileAsync } } />
}

const useAppDataContext = () => useContext(AppDataContext);

export { AppDataContextProvider, useAppDataContext };