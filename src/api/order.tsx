import { instance } from './auth';
import {
  ICreateOrderResponse,
  ICreateOrderRegister,
} from '../types/order/axios-order';

export const axiosCreateOrder = async (
  userData: ICreateOrderRegister
): Promise<ICreateOrderResponse> => {
  const { data }: { data: ICreateOrderResponse } = await instance.post(
    '/order/create',
    userData
  );
  return data;
};