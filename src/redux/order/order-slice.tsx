import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from './order-operations';
import { IOrderState } from '../../types/store/store-order';

const initialState: IOrderState = {
  error: '',
  message: '',
  loading: false,
  userOrders: [],
};

const order = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderError: store => {
      store.error = '';
    },
    clearOrderMessage: store => {
      store.message = '';
    },
  },

  extraReducers: (builder) => {
    // *Create Order
        builder.addCase(createOrder.pending, store => {
          store.loading = true;
          store.error = '';
        });
        builder.addCase(createOrder.fulfilled, (store, action) => {
          store.loading = false;
          store.message = action.payload.message;
        });
        builder.addCase(createOrder.rejected, (store, action: any) => {
          store.loading = false;
          store.error =
            action.payload.data?.message ||
            'Oops, something went wrong, try again';
        });
  }
});

export default order.reducer;

export const {
  clearOrderError,
  clearOrderMessage,
} = order.actions;