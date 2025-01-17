import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import routes from '../constants/app-api-routes';
import { HttpConstants } from '../constants/app-http-constants';
import {
    AuthContextModel,
    GetUserAuthDataFromStorageFunc,
    SignInAsyncFunc,
    SignOutAsyncFunc
} from '../models/auth-context';

import { AppBaseProviderProps } from '../models/app-base-provider-props';
import { AuthUserModel } from '../models/auth-user-model';
import { SignInModel } from '../models/signin-model';

const AuthContext = createContext<AuthContextModel>({} as AuthContextModel);
const useAuth = () => useContext(AuthContext);

function AuthProvider(props: AppBaseProviderProps) {
    const [user, setUser] = useState<AuthUserModel | null>(null);

    const getUserAuthDataFromStorage = useCallback<GetUserAuthDataFromStorageFunc>(() => {
        let userAuthData = null;
        try {
            const userAuthDataStr = localStorage.getItem('@userAuthData');
            if (userAuthDataStr) {
                userAuthData = JSON.parse(userAuthDataStr);
            }
        } catch (error) {
            console.log(
                `The error has occurred during getting auth data object from the app storage: ${(error as Error).message}`,
            );
        }
        return userAuthData;
    }, []);

    useEffect(() => {
        const userAuthData = getUserAuthDataFromStorage();

        setUser(userAuthData);
    }, [getUserAuthDataFromStorage]);

    const signIn = useCallback<SignInAsyncFunc>(async (signIn: SignInModel) => {
        let userAuthData = null;
        try {
            const response = await axios.post(
                `${routes.host}${routes.accountSignIn}`, signIn
            );

            if (response && response.status === HttpConstants.StatusCodes.Ok && response.data) {
                userAuthData = response.data;
                if (userAuthData) {
                    localStorage.setItem('@userAuthData', JSON.stringify(userAuthData));
                }
            }

            setUser(userAuthData);
        } catch (error) {
            console.log(`The authentication process was failed with error: ${(error as Error).message}`);
            throw error;
        }
    }, []);

    const signOut = useCallback<SignOutAsyncFunc>(async () => {
        const userAuthData = getUserAuthDataFromStorage();
        if (userAuthData) {
            try {
                const signoutResponse = await axios.post(`${routes.host}${routes.accountSignOut}`, userAuthData, {
                    headers: {
                        ...HttpConstants.Headers.ContentTypeJson,
                        'Authorization': `Bearer ${userAuthData.token}`,
                    },
                });

                console.log(signoutResponse);

            } catch (error) {
                console.log('It was happened error during a process of an user security token revoke!');
                throw error;
            }
        }
        localStorage.removeItem('@userAuthData');
        setUser(null);

    }, [getUserAuthDataFromStorage]);

    const isAuthenticated = useCallback(() => {
        const user = getUserAuthDataFromStorage();

        return user !== null;
    }, [getUserAuthDataFromStorage]);

    return (
        <AuthContext.Provider
            value={ {
                user,
                signIn,
                signOut,
                getUserAuthDataFromStorage,
                isAuthenticated
            } }
            { ...props }
        />
    );
}

export { AuthProvider, useAuth };