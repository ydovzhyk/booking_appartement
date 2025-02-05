import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  axiosRegister,
  axiosLogin,
  axiosLogout,
  axiosGetCurrentUser,
} from '../../api/auth';
import { IAuthUserData } from '../../types/auth/auth';
import {
  IRegistrationResponse,
  ILoginResponse,
  ILogoutResponse,
  IAuth,
} from '../../types/auth/axios-auth';

export const register = createAsyncThunk(
  'auth/register',
  async (userData: IAuthUserData, { rejectWithValue }) => {
    try {
      const data: IRegistrationResponse = await axiosRegister(userData);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const { data, status } = axiosError.response || {};
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
      const { data, status } = axiosError.response || {};
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
      const { data, status } = axiosError.response || {};
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
      const { data, status } = axiosError.response || {};
      const customError = { data, status };
      return rejectWithValue(customError);
    }
  }
);
