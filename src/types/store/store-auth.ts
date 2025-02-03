import { IUser } from "../auth/axios-auth";

export interface IAuthStore {
    user: IUser,
    sid: string | null,
    accessToken: string | null,
    refreshToken: string | null,
    isLogin: boolean,
    loading: boolean,
    isRefreshing: boolean,
    error: string | '',
    message: string | ''
}