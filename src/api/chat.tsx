import { instance } from './auth';

import { IGetChatsResponse } from '@/types/chat/axios-chat';
export const axiosGetUserChats = async (): Promise<IGetChatsResponse> => {
  const { data }: { data: IGetChatsResponse } =
    await instance.get('/chat/getChats');
  return data;
};
