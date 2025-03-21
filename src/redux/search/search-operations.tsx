import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  ISearchRegister,
  ISearchResponse,
} from '../../types/search/axios-search';
import { axiosSearchProperty } from '../../api/property';

export const searchProperty = createAsyncThunk(
  '/apartments/check',
  async (userData: ISearchRegister, { rejectWithValue }) => {
    try {
      const data: ISearchResponse = await axiosSearchProperty(userData);
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
