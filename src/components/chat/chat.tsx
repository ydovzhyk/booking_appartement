'use client';

import { useEffect, useState, useRef } from 'react';
import useSocket from '../../hooks/useSocket';
import { useSocketRef } from '../../hooks/useSocket';
import Image from 'next/image';
import Text from '../shared/text/text';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

interface Message {
  senderId: string;
  text: string;
  senderAvatar: string;
  senderName: string;
  createdAt: string;
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
  const [ownerAvatar, setOwnerAvatar] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const isOwnerOnline = useOnlineStatus(ownerId);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const {
    sendMessage,
    createChat,
    checkChat,
    getConversation,
    getOwnerInfo,
    initialize,
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
        getConversation(response.chatId, messages => {
          setMessages(messages);
        });
      }
    });
  }, [userId, message]);

  // оновлюємо коли приходять нові повідомлення в чат
  useEffect(() => {
    const socket = useSocketRef();
    if (!socket || !chatId || !userId) return;

    const handleNewMessage = () => {
      checkChat(userId, ownerId, apartmentId, (error, response) => {
        if (error || !response) return;
        if (response?.chatId) {
          getConversation(response.chatId, messages => {
            setMessages(messages);
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

  return (
    <div className="p-4 border ">
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
          You can chat with {ownerName}, the apartment manager.
        </Text>
      </div>
      <div
        className={`overflow-y-auto regular-border p-2 flex flex-col gap-2 ${
          messages.length > 3 ? 'h-[235px]' : 'h-[120px]'
        }`}
        style={{ borderRadius: '5px' }}
      >
        {messages
          .slice()
          .reverse()
          .map((msg, i) => (
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
                  style={{ fontSize: '16px', fontWeight: 'normal' }}
                >
                  {msg.text}
                </p>
                <div className="w-full flex flex-row justify-end">
                  <p
                    style={{ fontSize: '14px', fontWeight: 'light' }}
                    className="text-gray-500"
                  >
                    {formattedDate(msg.createdAt)}
                  </p>
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
          ))}
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