import { RootState } from '../store';
export const getLoadingChat = (state: RootState) => state.chat.loading;
export const getChatError = (state: RootState) => state.chat.error;
export const getChatMessage = (state: RootState) => state.chat.message;
export const getChatsArray = (state: RootState) => state.chat.chatsArray;
