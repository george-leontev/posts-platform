import { AuthUserModel } from './auth-user-model';
import { SignInModel } from './signin-model';

export type SignInAsyncFunc = (singIn: SignInModel) => Promise<void>;
export type SignOutAsyncFunc = () => Promise<void>;
export type GetUserAuthDataFromStorageFunc = () => AuthUserModel | null;

export type AuthContextModel = {
  user: AuthUserModel | null;

  signIn: SignInAsyncFunc;

  signOut: SignOutAsyncFunc;

  getUserAuthDataFromStorage: GetUserAuthDataFromStorageFunc;

  isAuthenticated: () => boolean
};