import { IChat } from '../chat/chat';

export interface IChatState {
  error: string;
  message: string;
  loading: boolean;
  chatsArray: IChat[];
}
