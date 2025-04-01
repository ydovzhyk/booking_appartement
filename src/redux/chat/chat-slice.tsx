import { createSlice } from '@reduxjs/toolkit';
import { getUserChats } from './chat-operations';
import { IChatState } from '../../types/store/store-chat';

const initialState: IChatState = {
  error: '',
  message: '',
  loading: false,
  chatsArray: [],
};

const chat = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearChatError: store => {
      store.error = '';
    },
    clearChatMessage: store => {
      store.message = '';
    },
  },

  extraReducers: (builder) => {
    // *Get User Chats
        builder.addCase(getUserChats.pending, store => {
          store.loading = true;
          store.error = '';
        });
        builder.addCase(getUserChats.fulfilled, (store, action) => {
          store.loading = false;
          store.chatsArray = action.payload;
        });
        builder.addCase(getUserChats.rejected, (store, action: any) => {
          store.loading = false;
          store.error =
            action.payload.data?.message ||
            'Oops, something went wrong, try again';
        });
  }
});

export default chat.reducer;

export const {
  clearChatError,
  clearChatMessage,
} = chat.actions;