import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  IPropertyRegister,
  IPropertyRegisterResponse,
} from '../../types/property/axios-property';
import { axiosRegisterProperty } from '../../api/property';

export const registerProperty = createAsyncThunk(
  'property/register',
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

