import { IOrder } from '../order/order';

export interface IOrderState {
  error: string;
  message: string;
  loading: boolean;
  userOrders: IOrder[];
}