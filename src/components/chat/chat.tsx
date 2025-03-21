'use client';

import { useEffect, useState } from 'react';
import useSocket from '../../hooks/useSocket';
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

  const {
    initialize,
    sendMessage,
    createChat,
    checkChat,
    getConversation,
    getOwnerInfo,
  } = useSocket();

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
        className="h-40 overflow-y-auto regular-border p-2"
        style={{ borderRadius: '5px' }}
      >
        {messages.map((msg, i) => (
          <p
            key={i}
            className={`text-sm ${msg.senderId === userId ? 'text-blue-500' : 'text-gray-700'}`}
          >
            {msg.text}
          </p>
        ))}
      </div>
      <div className="mt-2 flex">
        <input
          type="text"
          className="regular-border p-1 flex-1"
          value={message}
          onChange={e => setMessage(e.target.value)}
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