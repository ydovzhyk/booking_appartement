import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  IGetChatsResponse,
} from '../../types/chat/axios-chat';
import { axiosGetUserChats } from '../../api/chat';

export const getUserChats = createAsyncThunk(
  '/chat/getChats',
  async (_, { rejectWithValue }) => {
    try {
      const data: IGetChatsResponse = await axiosGetUserChats();
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
