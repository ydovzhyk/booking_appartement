'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { getLogin } from '../../../redux/auth/auth-selectors';
import { getCurrentUser } from '../../../redux/auth/auth-operations';
import { setRefreshUserData } from '../../../redux/auth/auth-slice';
import { useRouter } from 'next/navigation';
import useSocket from '@/hooks/useSocket';

const AuthProvider = () => {
  const { initialize } = useSocket(); // 👈 Імпортуй ініціалізацію сокета сюди
  const dispatch: AppDispatch = useDispatch();
  const navigationRouter = useRouter();
  const isLogin = useSelector(getLogin);
  const authData = useSelector((state: RootState) => state.auth);

  // 🔁 Запит користувача при наявності токенів
  useEffect(() => {
    if (
      authData.accessToken &&
      authData.refreshToken &&
      authData.sid &&
      !isLogin
    ) {
      dispatch(
        getCurrentUser({
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
          sid: authData.sid,
        })
      );
    }
  }, [
    dispatch,
    authData.accessToken,
    authData.refreshToken,
    authData.sid,
    isLogin,
  ]);

  // 🔑 Ініціалізація через URL-параметри
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams) {
      const accessToken = urlParams.get('accessToken');
      const refreshToken = urlParams.get('refreshToken');
      const sid = urlParams.get('sid');
      if (accessToken && refreshToken && sid) {
        const authData = { accessToken, refreshToken, sid };
        dispatch(setRefreshUserData(authData));
        dispatch(getCurrentUser(authData));
        navigationRouter.replace('/');
      }
    }
  }, [dispatch, navigationRouter]);

  // 🧠 ✅ ПІДПИСКА на `user-new-message` через сокет
  useEffect(() => {
    if (
      authData?.user?._id &&
      authData.accessToken &&
      authData.refreshToken &&
      authData.sid
    ) {
      initialize(authData.user._id, () => {
        dispatch(
          getCurrentUser({
            accessToken: authData.accessToken!,
            refreshToken: authData.refreshToken!,
            sid: authData.sid!,
          })
        );
      });
    }
  }, [
    authData.user?._id,
    authData.accessToken,
    authData.refreshToken,
    authData.sid,
    dispatch,
  ]);

  return null;
};

export default AuthProvider;
