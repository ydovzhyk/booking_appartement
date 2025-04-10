import axios from 'axios';
import { Store } from 'redux';
import { RootState } from '../redux/store';
import { getAuthDataFromStorage } from '../utils/helpers/auth-data-persisted-state';
import { IAuthUserData } from '../types/auth/auth';
import {
  IRegistrationResponse,
  ILoginResponse,
  ILogoutResponse,
  IAuth,
  IUpdateUserResponse,
  IVerifyResponse,
} from '../types/auth/axios-auth';
import { IVerifyEmailData } from '../types/auth/auth';
import { setRefreshUserData } from '../redux/auth/auth-slice';

const REACT_APP_API_URL = 'http://localhost:4000';
// const REACT_APP_API_URL =
//   "https://test-task-backend-34db7d47d9c8.herokuapp.com";

export const instance = axios.create({
  baseURL: REACT_APP_API_URL,
});

export function setupInterceptors(store: Store<RootState>) {
  instance.interceptors.request.use(
    config => {
      const authData = getAuthDataFromStorage(store);
      if (authData && authData.accessToken && config.url !== '/auth/refresh') {
        config.headers['Authorization'] = `Bearer ${authData.accessToken}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    response => response,
    async error => {
      if (
        error.response.status === 401 &&
        error.response.data.message === 'Unauthorized'
      ) {
        try {
          const authData = getAuthDataFromStorage(store);
          if (authData && authData.refreshToken) {
            const { refreshToken, sid } = authData;
            instance.defaults.headers.Authorization = `Bearer ${refreshToken}`;
            const { data } = await instance.post('/auth/refresh', { sid });

            const authNewData = {
              accessToken: data.newAccessToken,
              refreshToken: data.newRefreshToken,
              sid: data.sid,
            };

            store.dispatch(setRefreshUserData(authNewData));
          } else {
            return Promise.reject(error);
          }

          if (error.config.url === '/auth/current') {
            const authData = getAuthDataFromStorage(store);
            if (authData && authData.accessToken) {
              const { accessToken, refreshToken, sid } = authData;
              const originalRequest = error.config;
              originalRequest.headers['Authorization'] =
                `Bearer ${accessToken}`;
              originalRequest.data = {
                accessToken: accessToken,
                refreshToken: refreshToken,
                sid: sid,
              };
              return instance(originalRequest);
            } else {
              return Promise.reject(error);
            }
          } else {
            const authData = getAuthDataFromStorage(store);
            if (authData && authData.accessToken) {
              const { accessToken } = authData;
              const originalRequest = error.config;
              originalRequest.headers['Authorization'] =
                `Bearer ${accessToken}`;
              return instance(originalRequest);
            } else {
              return Promise.reject(error);
            }
          }
        } catch (error) {
          return Promise.reject(error);
        }
      } else if (
        error.response.status === 401 &&
        error.response.data.message === 'Please login again'
      ) {
        const authData = {
          accessToken: null,
          refreshToken: null,
          sid: null,
        };

        store.dispatch(setRefreshUserData(authData));

        return Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    }
  );
}

export const axiosRegister = async (
  userData: IAuthUserData
): Promise<IRegistrationResponse> => {
  const { data }: { data: IRegistrationResponse } = await instance.post(
    '/auth/register',
    userData
  );
  return data;
};

export const axiosLogin = async (
  userData: IAuthUserData
): Promise<ILoginResponse> => {
  const { data }: { data: ILoginResponse } = await instance.post(
    '/auth/login',
    userData
  );
  return data;
};

export const axiosLogout = async (): Promise<ILogoutResponse> => {
  const { data }: { data: ILogoutResponse } =
    await instance.post('/auth/logout');
  return data;
};

export const axiosGetCurrentUser = async (
  userData: IAuth
): Promise<ILoginResponse> => {
  const { data }: { data: ILoginResponse } = await instance.post(
    '/auth/current',
    userData
  );
  return data;
};

export const axiosUpdateUserData = async (
  userData: IAuthUserData
): Promise<IUpdateUserResponse> => {
  const { data }: { data: IUpdateUserResponse } = await instance.post(
    '/auth/edit',
    userData
  );
  return data;
};

export const axiosVerifyEmail = async (
  userData: IVerifyEmailData | FormData
): Promise<IVerifyResponse> => {
  const { data }: { data: IVerifyResponse } = await instance.post(
    '/auth/verify',
    userData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return data;
};
