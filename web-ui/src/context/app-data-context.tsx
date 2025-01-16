import axios from "axios";
import { createContext, useCallback, useContext } from "react";
import { PostModel } from "../models/post-model";

export type AppDataContextModel = {
    getPostsAsync: () => Promise<PostModel[] | undefined>,
    addPostAsync: (post: PostModel) => Promise<PostModel | undefined>
}

const AppDataContext = createContext({} as AppDataContextModel);

export type AppDataContextProviderProps = object


function AppDataContextProvider(props: AppDataContextProviderProps) {
    const getPostsAsync = useCallback(async () => {
        try {
            const response = await axios.request({
                method: 'GET',
                url: 'http://localhost:3000/api/posts',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM3MDM0NzgyfQ.MNT0eI5NMgDgwd-lBK7GH7SOicwUdOpwrSXmy9rFwHg'
                }
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
            const response = await axios.request({
                method: 'POST',
                url: 'http://localhost:3000/api/posts',
                data: post,
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM3MDM0NzgyfQ.MNT0eI5NMgDgwd-lBK7GH7SOicwUdOpwrSXmy9rFwHg',
                    'Content-Type': 'application/json'
                }
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