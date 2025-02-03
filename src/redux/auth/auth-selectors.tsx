import { IAuthStore } from '../../types/store/store-auth'; 

interface RootAuthStore {
    auth: IAuthStore;
}

export const getLogin = (store: RootAuthStore) => store.auth.isLogin;
export const getUser = (store: RootAuthStore) => store.auth.user;
export const getAuthLoading = (store: RootAuthStore) => store.auth.loading;
export const getRefreshing = (store: RootAuthStore) => store.auth.isRefreshing;
export const getAuthError = (store: RootAuthStore) => store.auth.error;
export const getAuthMessage = (store: RootAuthStore) => store.auth.message;
export const getaccessToken = (store: RootAuthStore) => store.auth.accessToken;
