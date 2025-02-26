import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AxiosError } from 'axios';
import { getCurrentUser } from '../auth/auth-operations';
import {
  IPropertyRegister,
  IPropertyRegisterResponse,
  ILikeProperty,
  ILikePropertyResponse,
  IPropertyTypesArrayResponse
} from '../../types/property/axios-property';
import {
  axiosRegisterProperty,
  axiosLikeProperty,
  axiosPropertyTypesArray,
} from '../../api/property';

export const registerProperty = createAsyncThunk(
  '/apartments/create',
  async (userData: IPropertyRegister | FormData, { rejectWithValue }) => {
    try {
      const data: IPropertyRegisterResponse =
        await axiosRegisterProperty(userData);
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

export const propertyTypesArray = createAsyncThunk(
  '/apartments/type',
  async (_, { rejectWithValue }) => {
    try {
      const data: IPropertyTypesArrayResponse = await axiosPropertyTypesArray();
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

export const likeProperty = createAsyncThunk(
  '/apartments/like',
  async (userData: ILikeProperty, { rejectWithValue, dispatch, getState }) => {
    try {
      const data: ILikePropertyResponse = await axiosLikeProperty(userData);

      const state = getState() as RootState;
      const { accessToken, refreshToken, sid } = state.auth;

      if (accessToken && refreshToken && sid) {
        dispatch(getCurrentUser({ accessToken, refreshToken, sid }));
      }

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

