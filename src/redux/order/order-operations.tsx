import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  ICreateOrderResponse,
  ICreateOrderRegister,
} from '../../types/order/axios-order';
import { axiosCreateOrder } from '../../api/order';

interface ICustomError {
  data: unknown;
  status: number | string | undefined;
}

export const createOrder = createAsyncThunk<
  ICreateOrderResponse,
  ICreateOrderRegister,
  { rejectValue: ICustomError }
>('/order/create', async (userData, { rejectWithValue }) => {
  try {
    const data: ICreateOrderResponse = await axiosCreateOrder(userData);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const { data, status } = axiosError.response || {
      data: axiosError.code,
      status: axiosError.status,
    };
    const customError: ICustomError = { data, status };
    return rejectWithValue(customError);
  }
});
