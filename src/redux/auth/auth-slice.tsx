import { createSlice } from '@reduxjs/toolkit';
import {
    register,
    login,
    logout,
    getCurrentUser,
} from './auth-operations';
import { IAuthStore } from '../../types/store/store-auth';
import { ILoginResponse } from '../../types/auth/axios-auth';

const initialState: IAuthStore = {
    user: {
        id: null as string | null,
        username: null as string | null,
        email: null as string | null,
        userAvatar: null as string | null,
        passwordHash: null as string | null,
        dateCreate: null as Date | null,
    },
    sid: null,
    accessToken: null,
    refreshToken: null,
    isLogin: false,
    loading: false,
    isRefreshing: false,
    error: '',
    message: '',
};

const accessAuth = (store: IAuthStore, payload: ILoginResponse) => {
    store.loading = false;
    store.isLogin = true;
    store.user = payload.user;
    store.sid = payload.sid;
    store.accessToken = payload.accessToken;
    store.refreshToken = payload.refreshToken;
};

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearUser: () => ({ ...initialState }),
        clearUserError: store => {
            store.error = '';
        },
        clearUserMessage: store => {
            store.message = '';
        },
        setRefreshUserData: (store, action) => {
            store.sid = action.payload.sid;
            store.accessToken = action.payload.accessToken;
            store.refreshToken = action.payload.refreshToken;
        },
    },


    extraReducers: (builder) => {
    // * REGISTER
    builder.addCase(register.pending, (store) => {
        store.loading = true;
        store.error = '';
    });
    builder.addCase(register.fulfilled, (store, action) => {
        store.loading = false;
        store.isLogin = false;
        store.sid = '';
        store.accessToken = '';
        store.refreshToken = '';
        store.user.username = action.payload.username;
        store.user.email = action.payload.email;
        store.user.id = action.payload.id;
        store.user.userAvatar = action.payload.userAvatar;
    });
    builder.addCase(register.rejected, (store, action: any) => {
        store.loading = false;
        store.error = action.payload.data?.message || 'Oops, something went wrong, try again';
    });
        
    // * LOGIN
    builder.addCase(login.pending, (store) => {
        store.loading = true;
        store.error = '';
    });
    builder.addCase(login.fulfilled, (store, { payload }) => accessAuth(store, payload));
    builder.addCase(login.rejected, (store, action: any) => {
        store.loading = false;
        store.error = action.payload.data?.message || 'Oops, something went wrong, try again';
    });
        
    //* LOGOUT
    builder.addCase(logout.pending, (store) => {
        store.loading = true;
        store.error = '';
    });
    builder.addCase(logout.fulfilled, () => initialState);
    builder.addCase(logout.rejected, (store, action: any) => {
        store.loading = false;
        store.error = action.payload.data?.message || 'Oops, something went wrong, try again';
    });
        
    // *GET CURRENT USER
    builder.addCase(getCurrentUser.pending, (store) => {
        store.loading = true;
        store.isRefreshing = true;
        store.error = '';
    });
    builder.addCase(getCurrentUser.fulfilled, (store, { payload }) => {
        accessAuth(store, payload);
        store.isRefreshing = false;
    });
    builder.addCase(getCurrentUser.rejected, (store, action: any) => {
        store.loading = false;
        
        store.error = action.payload.data?.message || 'Oops, something went wrong, try again';
    });
}   
});

export default auth.reducer;
export const {
  clearUser,
  clearUserError,
  clearUserMessage,
  setRefreshUserData,
} = auth.actions;