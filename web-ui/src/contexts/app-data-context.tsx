import { createContext, useCallback, useContext } from 'react';
import { PostModel } from '../models/post-model';
import { useAuthHttpRequest } from './use-auth-http-request';
import routes from '../constants/app-api-routes';
import { HttpConstants } from '../constants/app-http-constants';
import { UploadedFileModel } from '../models/uploaded-file-model';

export type AppDataContextModel = {
    getPostsAsync: () => Promise<PostModel[] | undefined>;
    addPostAsync: (post: PostModel) => Promise<PostModel | undefined>;
    deletePostAsync: (id: number) => Promise<any>;
    updatePostAsync: (updatedPost: PostModel) => Promise<PostModel | undefined>;
    getPostAsync: (postId: number) => Promise<PostModel | undefined>;
    addUploadedFileAsync: (postId: number, formData: FormData) => Promise<UploadedFileModel | undefined>;
    getUploadedFileAsync: (id: number) => Promise<string | undefined>;
    getAllUploadedFilesAsync: (postId: number) => Promise<{ id: number }[] | undefined>;
};

const AppDataContext = createContext({} as AppDataContextModel);

export type AppDataContextProviderProps = object;

function AppDataContextProvider(props: AppDataContextProviderProps) {
    const authHttpRequest = useAuthHttpRequest();

    const getPostAsync = useCallback(
        async (postId: number) => {
            const response = await authHttpRequest({
                method: 'GET',
                url: `${routes.posts}/${postId}`,
            });

            if (response && response.status == HttpConstants.StatusCodes.Ok) {
                return response.data as PostModel;
            }
        },
        [authHttpRequest],
    );

    const getPostsAsync = useCallback(async () => {
        try {
            const response = await authHttpRequest({
                method: 'GET',
                url: routes.posts,
            });

            if (response && response.status === HttpConstants.StatusCodes.Ok) {
                return response.data as PostModel[];
            }
        } catch (error) {
            console.log(error);
        }
    }, [authHttpRequest]);

    const addPostAsync = useCallback(
        async (post: PostModel) => {
            try {
                const response = await authHttpRequest({
                    method: HttpConstants.Methods.Post,
                    url: routes.posts,
                    data: post,
                });

                if (response && response.status === HttpConstants.StatusCodes.Created) {
                    return response.data as PostModel;
                }
            } catch (error) {
                console.log(error);
            }
        },
        [authHttpRequest],
    );

    const updatePostAsync = useCallback(
        async (updatedPost: PostModel) => {
            try {
                const response = await authHttpRequest({
                    method: HttpConstants.Methods.Put,
                    url: routes.posts,
                    data: updatedPost,
                });

                if (response && response.status === HttpConstants.StatusCodes.Ok) {
                    return response.data as PostModel;
                }
            } catch (error) {
                console.log(error);
            }
        },
        [authHttpRequest],
    );

    const deletePostAsync = useCallback(
        async (id: number) => {
            try {
                const response = await authHttpRequest({
                    method: HttpConstants.Methods.Delete,
                    url: `${routes.posts}/${id}`,
                });

                if (response && response.status === HttpConstants.StatusCodes.Ok) {
                    return response.data;
                }
            } catch (error) {
                console.log(error);
            }
        },
        [authHttpRequest],
    );

    const addUploadedFileAsync = useCallback(
        async (postId: number, formData: FormData) => {
            try {
                const response = await authHttpRequest({
                    method: HttpConstants.Methods.Post,
                    url: `${routes.uploadedFiles}/${postId}`,
                    headers: { 'Content-Type': 'multipart/form-data' },
                    data: formData,
                });

                if (response && response.status === HttpConstants.StatusCodes.Created) {
                    return response.data as UploadedFileModel;
                }
            } catch (error) {
                console.log(error);
            }
        },
        [authHttpRequest],
    );

    const getUploadedFileAsync = useCallback(
        async (id: number) => {
            const response = await authHttpRequest({
                url: `${routes.uploadedFiles}/${id}`,
                method: HttpConstants.Methods.Get,
            });

            if (response && response.status === HttpConstants.StatusCodes.Ok) {
                return response.data as string;
            }
        },
        [authHttpRequest],
    );

    const getAllUploadedFilesAsync = useCallback(
        async (postId: number) => {
            const response = await authHttpRequest({
                url: `${routes.uploadedFiles}/list/${postId}`,
                method: HttpConstants.Methods.Get,
            });

            if (response && response.status === HttpConstants.StatusCodes.Ok) {
                return response.data as { id: number }[];
            }
        },
        [authHttpRequest],
    );

    return (
        <AppDataContext.Provider
            {...props}
            value={{
                getPostAsync,
                getPostsAsync,
                addPostAsync,
                updatePostAsync,
                deletePostAsync,
                addUploadedFileAsync,
                getUploadedFileAsync,
                getAllUploadedFilesAsync,
            }}
        />
    );
}

const useAppDataContext = () => useContext(AppDataContext);

export { AppDataContextProvider, useAppDataContext };
