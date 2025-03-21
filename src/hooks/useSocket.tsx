import { useRef } from 'react';
import io from 'socket.io-client';

// const serverURL = 'http://localhost:4000';
const serverURL = 'wss://test-task-backend-34db7d47d9c8.herokuapp.com';

interface Message {
  senderId: string;
  text: string;
  senderAvatar: string;
  senderName: string;
  createdAt: string;
}

export let socketRef: ReturnType<typeof io> | null = null;
export const useSocketRef = () => socketRef;

const subscriptions = ['new-message', 'user-online', 'user-offline'];

const useSocket = () => {
  const isInitialized = useRef(false);

  const initialize = (userId: string) => {
    if (isInitialized.current || !userId) return;

    socketRef = io(serverURL, {
      query: { userId },
    });

    socketRef.on('connect', () => {
      console.log('🟢 WebSocket connected');
    });

    socketRef.on('disconnect', () => {
      console.log('🔴 WebSocket disconnected');
    });

    subscriptions.forEach(event => {
      socketRef?.on(event, (payload: unknown) => {
        console.log(`📥 Event: ${event}`, payload);
      });
    });

    isInitialized.current = true;
  };

  const disconnect = () => {
    if (socketRef) {
      subscriptions.forEach(event => {
        socketRef?.off(event);
      });

      socketRef.disconnect();
      socketRef = null;
      isInitialized.current = false;

      console.log('🛑 WebSocket disconnected manually');
    }
  };

  const sendMessage = (
    userId: string,
    chatId: string,
    messageText: string,
    callback: (error: string | null, response: { info?: string } | null) => void
  ) => {
    if (socketRef) {
      socketRef.emit(
        'message',
        {
          chatId,
          senderId: userId,
          text: messageText,
        },
        (error: string | null, response: { info?: string } | null) => {
          if (error || !response || !response.info) return;
          callback(error, response);
        }
      );
    }
  };

  const createChat = (
    userId: string,
    ownerId: string,
    apartmentId: string,
    callback: (
      error: string | null,
      response: { chatId?: string } | null
    ) => void
  ) => {
    socketRef?.emit(
      'create-chat',
      { userId, ownerId, apartmentId },
      (error: string | null, response: { chatId?: string } | null) => {
        if (error || !response || !response.chatId) return;
        callback(error, response);
      }
    );
  };

  const checkChat = (
    userId: string,
    ownerId: string,
    apartmentId: string,
    callback: (
      error: string | null,
      response: { chatId?: string } | null
    ) => void
  ) => {
    socketRef?.emit(
      'check-chat',
      { userId, ownerId, apartmentId },
      (error: string | null, response: { chatId?: string } | null) => {
        if (error || !response || !response.chatId) return;
        callback(error, response);
      }
    );
  };

  const getConversation = (
    chatId: string,
    callback: (messages: Message[]) => void
  ) => {
    socketRef?.emit(
      'conversation',
      { chatId },
      (error: string | null, response: { messages?: Message[] } | null) => {
        if (error || !response || !response.messages) return;
        callback(response.messages);
      }
    );
  };

  const getOwnerInfo = (
    ownerId: string,
    callback: (
      error: string | null,
      response: { info?: { avatar: string; name: string } } | null
    ) => void
  ) => {
    socketRef?.emit(
      'owner-avatar',
      { ownerId },
      (
        error: string | null,
        response: { info?: { avatar: string; name: string } } | null
      ) => {
        if (error || !response || !response.info) return;
        callback(error, response);
      }
    );
  };

  return {
    initialize,
    disconnect,
    sendMessage,
    createChat,
    checkChat,
    getConversation,
    getOwnerInfo,
  };
};

export default useSocket;
