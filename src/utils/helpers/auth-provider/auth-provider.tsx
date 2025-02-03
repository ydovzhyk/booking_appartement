"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { getLogin } from '../../../redux/auth/auth-selectors';
import { getCurrentUser } from '../../../redux/auth/auth-operations';
import { setRefreshUserData } from '../../../redux/auth/auth-slice';
import { RootState } from '../../../redux/store';
import { useRouter } from "next/navigation";

const AuthProvider = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigationRouter = useRouter();
    const isLogin = useSelector(getLogin);
    const authData = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (authData.accessToken && authData.refreshToken && authData.sid && !isLogin) {
            dispatch(getCurrentUser({
                accessToken: authData.accessToken,
                refreshToken: authData.refreshToken,
                sid: authData.sid
            }));
        } else {
            return;
        }
    }, [dispatch, authData.accessToken, authData.refreshToken, authData.sid, isLogin]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams) {
            const accessToken = urlParams.get('accessToken');
            const refreshToken = urlParams.get('refreshToken');
            const sid = urlParams.get('sid');
            if (accessToken && refreshToken && sid) {
                const authData = { accessToken, refreshToken, sid }
                dispatch(setRefreshUserData(authData));
                dispatch(getCurrentUser(authData));
                navigationRouter.replace('/');
            } else {
                return;
            }
        } else {
            return;
        }
    }, [dispatch, navigationRouter]);

    return null;
};

export default AuthProvider;

