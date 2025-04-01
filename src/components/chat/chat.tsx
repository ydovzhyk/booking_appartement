'use client';

import { useEffect, useState } from 'react';
import useSocket from '../../hooks/useSocket';
import { useAppDispatch } from '@/utils/helpers/hooks';
import { useSelector } from 'react-redux';
import { getAuthData } from '@/redux/auth/auth-selectors';
import { getCurrentUser } from '@/redux/auth/auth-operations';
import { useSocketRef } from '../../hooks/useSocket';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { MdOutlineFiberNew } from 'react-icons/md';
import Image from 'next/image';
import Text from '../shared/text/text';

interface Message {
  _id: string;
  senderId: string;
  text: string;
  senderAvatar: string;
  senderName: string;
  createdAt: string;
}

export interface Chat {
  chatId: string;
  users: [string, string];
  propertyId: string;
  lastMessage: string;
  newMessagesUserOne: string[];
  newMessagesUserTwo: string[];
  lastMessageAt: string;
}

interface ChatProps {
  ownerId: string;
  userId: string | null;
  apartmentId: string;
}

const Chat: React.FC<ChatProps> = ({ userId, ownerId, apartmentId }) => {
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<any | null>(null);
  const [ownerAvatar, setOwnerAvatar] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const isOwnerOnline = useOnlineStatus(ownerId);
  const dispatch = useAppDispatch();
  const authData = useSelector(getAuthData);

  const {
    sendMessage,
    createChat,
    checkChat,
    getConversation,
    getOwnerInfo,
    initialize,
    clearNewMessages,
  } = useSocket();

  const formattedDate = (createdAt: string) => {
    return new Date(createdAt).toLocaleString('uk-UA', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // При вході в чат перевіряємо чи є діалог
  useEffect(() => {
    if (!userId) return;
    initialize(userId);
    getOwnerInfo(ownerId, (error, response) => {
      if (error || !response) return;
      if (response?.info) {
        setOwnerAvatar(response.info.avatar);
        setOwnerName(response.info.name);
      }
    });
    checkChat(userId, ownerId, apartmentId, (error, response) => {
      if (error || !response) return;
      if (response?.chatId) {
        setChatId(response.chatId);
        getConversation(response.chatId, (messages, chatData) => {
          setMessages(messages);
          setChat(chatData);

          // 🔎 Перевіряємо, чи є нові повідомлення для користувача
          const userIndex = chatData.users.indexOf(userId);
          const newMessages =
            userIndex === 0
              ? chatData.newMessagesUserOne
              : chatData.newMessagesUserTwo;

          if (newMessages.length > 0) {
            clearMessages(response.chatId, chatData, userId);
          }
        });
      }
    });
  }, [userId, message]);

  // Оновлюємо чат коли приходять нові повідомлення
  useEffect(() => {
    const socket = useSocketRef();
    if (!socket || !chatId || !userId) return;

    const handleNewMessage = () => {
      checkChat(userId, ownerId, apartmentId, (error, response) => {
        if (error || !response) return;
        if (response?.chatId) {
          getConversation(response.chatId, (messages, chatData) => {
            setMessages(messages);
            setChat(chatData);
            clearMessages(response?.chatId, chatData, userId);
          });
        }
      });
    };

    socket.on('message', handleNewMessage);

    return () => {
      socket.off('message', handleNewMessage);
    };
  }, [chatId]);

  const createChatAndSendMessage = () => {
    if (!chatId && userId) {
      createChat(userId, ownerId, apartmentId, (error, response) => {
        if (error || !response) return;
        if (response?.chatId) {
          setChatId(response.chatId);
          sendMessage(userId, response.chatId, message, (error, response) => {
            if (error || !response) return;
            if (response?.info === 'Message sent') {
              setMessage('');
            }
          });
        }
      });
    }
    if (chatId && userId) {
      sendMessage(userId, chatId, message, (error, response) => {
        if (error || !response) return;
        if (response?.info === 'Message sent') {
          setMessage('');
        }
      });
    }
  };

  const isNewMessage = (msgId: string): boolean => {
    const userIndex = chat.users.indexOf(userId);
    if (userIndex === -1) return false;
    const newMessages =
      userIndex === 0 ? chat.newMessagesUserOne : chat.newMessagesUserTwo;
    return newMessages.includes(msgId);
  };

  const clearMessages = (chatId: string | undefined, chat: Chat, userId: string ) => {
    if (!userId || !chat) return;
    const userIndex = chat.users.indexOf(userId);
    if (userIndex === -1) return;
    const field = userIndex === 0 ? 'newMessagesUserOne' : 'newMessagesUserTwo';

    setTimeout(() => {
      if(!chatId) return;
      clearNewMessages(chatId, field, userId, (error, response) => {
        if (error || !response) return;
        if (response.message === 'Success') {
          getConversation(chatId, (messages, chatData) => {
            setMessages(messages);
            setChat(chatData);
          });
          if (authData.accessToken && authData.refreshToken && authData.sid) {
            dispatch(
              getCurrentUser({
                accessToken: authData.accessToken,
                refreshToken: authData.refreshToken,
                sid: authData.sid,
              })
            );
          }
        }
      });
    }, 20000);
  };

  const chatTitleText = () => {
    if (!chat || !chat.users || !userId) return '';
    if (chat.users[0] === userId)
      return `You can chat with ${ownerName}, the apartment manager.`;
    return `You can chat with our client ${ownerName}.`;
  };

  return (
    <div className="p-4 border border-gray-200 shadow rounded-lg">
      <div className="w-full flex flex-row items-center gap-2 mb-[15px]">
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-row items-center justify-between gap-[10px] w-[45px] h-[45px] bg-white rounded-full">
            {ownerAvatar && (
              <Image
                src={ownerAvatar}
                alt="Userphoto"
                width={45}
                height={45}
                className="rounded-full"
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`w-[10px] h-[10px] rounded-full ${isOwnerOnline ? 'bg-green-500' : 'bg-orange-400'}`}
            />
            <Text type="small" fontWeight="light" as="p">
              {isOwnerOnline ? 'Online' : 'Offline'}
            </Text>
          </div>
        </div>
        <Text type="small" as="p" fontWeight="normal">
          {chatTitleText()}
        </Text>
      </div>
      <div
        className={`overflow-y-auto regular-border p-2 flex flex-col gap-2 ${
          messages.length === 0
            ? 'h-[90px]'
            : messages.length === 1
              ? 'h-[90px]'
              : messages.length === 2
                ? 'h-[180px]'
                : messages.length > 2
<<<<<<< HEAD
                  ? 'h-[240px]'
                  : 'h-[240px]'
=======
                  ? 'h-[240px]' : 'h-[240px]'
>>>>>>> 586b8f6a551bbdba588d36c89d78d7f2e7839c5a
        }`}
        style={{ borderRadius: '5px' }}
      >
        {messages
          .slice()
          .reverse()
          .map((msg, i) => {
            const isNew = isNewMessage(msg._id);
            return (
              <div className="w-full flex flex-row gap-[10px]" key={i}>
                {msg.senderId === userId && msg.senderAvatar && (
                  <div className="flex flex-row items-center justify-center2">
                    <Image
                      src={msg.senderAvatar}
                      alt="Userphoto"
                      width={45}
                      height={45}
                      className="rounded-full"
                    />
                  </div>
                )}
                <div
                  className="w-full flex flex-col gap-1 border p-2"
                  style={{ borderRadius: '5px' }}
                >
                  <p
                    key={i}
                    className={` ${msg.senderId === userId ? 'text-blue-500' : 'text-gray-700'}`}
                    style={{
                      fontSize: '16px',
                      fontWeight: isNew ? 'bold' : 'normal',
                    }}
                  >
                    {msg.text}
                  </p>
                  <div className="w-full flex flex-row al justify-end">
                    <div className="flex flex-row items-center gap-2">
                      {isNew && <MdOutlineFiberNew size={25} />}
                      <p
                        style={{ fontSize: '14px', fontWeight: 'light' }}
                        className="text-gray-500 mt-[3px]"
                      >
                        {formattedDate(msg.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
                {msg.senderId !== userId && msg.senderAvatar && (
                  <div className="flex flex-row items-center justify-center2">
                    <Image
                      src={msg.senderAvatar}
                      alt="Userphoto"
                      width={45}
                      height={45}
                      className="rounded-full"
                    />
                  </div>
                )}
              </div>
            );
          })}
      </div>
      <div className="mt-2 flex">
        <input
          type="text"
          className="regular-border p-1 flex-1"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && message.trim() !== '') {
              e.preventDefault();
              createChatAndSendMessage();
            }
          }}
          style={{
            borderRadius: '5px',
            paddingRight: '10px',
            paddingLeft: '10px',
          }}
        />
        <button
          onClick={createChatAndSendMessage}
          disabled={message.trim() === ''}
          className={`ml-3 px-3 pt-2 pb-1 regular-border text-[var(--accent-background)] ${message.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{ borderRadius: '5px' }}
        >
          <Text type="small" as="span" fontWeight="normal" lineHeight="none">
            Send
          </Text>
        </button>
      </div>
    </div>
  );
};

export default Chat;