import { useCallback } from 'react';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpConstants } from '../constants/app-http-constants';
import { httpClientBase } from './http-client-base';
import { useAuth } from './app-auth-context';

export type AxiosWithCredentialsFunc = (config: AxiosRequestConfig, suppressLoader?: boolean, suppressShowUnauthorized?: boolean) => Promise<AxiosResponse | undefined>;

export const useAuthHttpRequest = () => {
    const { getUserAuthDataFromStorage, signOut } = useAuth();

    const axiosWithCredentials = useCallback<AxiosWithCredentialsFunc>(

        async (config: AxiosRequestConfig) => {
            let response: AxiosResponse<any, any> | null | AxiosResponse<unknown, any> | undefined = null;
            const userAuthData = getUserAuthDataFromStorage();
            config = config || {};
            config.headers = config.headers || {};
            config.headers = { ...config.headers, ...HttpConstants.Headers.AcceptJson };
            config.timeoutErrorMessage = 'Server didn\'t return answer in the given time interval'

            if (userAuthData && config.headers) {
                config.headers.Authorization = `Bearer ${userAuthData.token}`;
            }

            try {
                response = await httpClientBase.request(config) as AxiosResponse;
            } catch (error) {
                response = (error as AxiosError).response;
                if (response?.status === 401) {
                    await signOut();
                } else {
                    alert((error as Error).message);
                }
            }

            return response;
        },
        [getUserAuthDataFromStorage, signOut],

    );

    return axiosWithCredentials
}