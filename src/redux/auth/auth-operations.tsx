import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  axiosRegister,
  axiosLogin,
  axiosLogout,
  axiosGetCurrentUser,
  axiosUpdateUserData,
  axiosVerifyEmail,
} from '../../api/auth';
import { IAuthUserData } from '../../types/auth/auth';
import {
  IRegistrationResponse,
  ILoginResponse,
  ILogoutResponse,
  IAuth,
  IUpdateUserResponse,
  IVerifyResponse,
} from '../../types/auth/axios-auth';
import { IVerifyEmailData } from '../../types/auth/auth';

export const register = createAsyncThunk(
  'auth/register',
  async (userData: IAuthUserData, { rejectWithValue }) => {
    try {
      const data: IRegistrationResponse = await axiosRegister(userData);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const { data, status } = axiosError.response || {
        data: axiosError.code,
        status: axiosError.status,
      };
      const customError = { data, status };
      return rejectWithValue(customError);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData: IAuthUserData, { rejectWithValue }) => {
    try {
      const data: ILoginResponse = await axiosLogin(userData);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const { data, status } = axiosError.response || {
        data: axiosError.code,
        status: axiosError.status,
      };
      const customError = { data, status };
      return rejectWithValue(customError);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const data: ILogoutResponse = await axiosLogout();
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const { data, status } = axiosError.response || {
        data: axiosError.code,
        status: axiosError.status,
      };
      const customError = { data, status };
      return rejectWithValue(customError);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/current',
  async (userData: IAuth, { rejectWithValue }) => {
    try {
      const data: ILoginResponse = await axiosGetCurrentUser(userData);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const { data, status } = axiosError.response || {
        data: axiosError.code,
        status: axiosError.status,
      };
      const customError = { data, status };
      return rejectWithValue(customError);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'auth/edit',
  async (userData: IAuthUserData, { rejectWithValue }) => {
    try {
      const data: IUpdateUserResponse = await axiosUpdateUserData(userData);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const { data, status } = axiosError.response || {
        data: axiosError.code,
        status: axiosError.status,
      };
      const customError = { data, status };
      return rejectWithValue(customError);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verify',
  async (userData: IVerifyEmailData | FormData, { rejectWithValue }) => {
    try {
      const data: IVerifyResponse = await axiosVerifyEmail(userData);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const { data, status } = axiosError.response || {
        data: axiosError.code,
        status: axiosError.status,
      };
      const customError = { data, status };
      return rejectWithValue(customError);
    }
  }
);

export const verifyConfirmation = message => ({
  type: 'auth/verifyConfirmation',
  payload: { message },
});