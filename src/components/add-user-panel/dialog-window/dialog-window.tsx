'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/utils/helpers/hooks';
import { getUserChats } from '@/redux/chat/chat-operations';
import { getChatsArray } from '@/redux/chat/chat-selectors';
import { getUser } from '@/redux/auth/auth-selectors';
import { IoMdClose } from 'react-icons/io';
import Chat from '@/components/chat/chat';
import Text from '@/components/shared/text/text';
import { IChat } from '@/types/chat/chat';

interface DialogWindowProps {
  onClose: () => void;
}

const DialogWindow: React.FC<DialogWindowProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const userChats = useSelector(getChatsArray);
  const user = useSelector(getUser);
  const currentUserId = user?._id || null;
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null);

  useEffect(() => {
    dispatch(getUserChats());
  }, [dispatch]);

  useEffect(() => {
    if (userChats.length && !selectedChat) {
      setSelectedChat(userChats[0]);
    }
  }, [userChats, selectedChat]);

  const renderChatsList = () => {
    if (!userChats.length) {
      return <p className="text-gray-500 text-sm">Немає активних чатів</p>;
    }

    return userChats.map(chat => {
      if (!currentUserId) return null;
      const isSelected = selectedChat?._id === chat._id;
      const userIndex = chat.users.indexOf(currentUserId);
      const numberNewMessages =
        userIndex === 0
          ? chat.newMessagesUserOne.length
          : chat.newMessagesUserTwo.length;
      const lastMsg =
        chat.lastMessage.length > 60
          ? chat.lastMessage.slice(0, 60) + '...'
          : chat.lastMessage;

      return (
        <div
          key={chat._id}
          className={`relative flex items-center gap-3 p-2 border rounded-lg cursor-pointer transition-all duration-200 mb-[25px]
            ${isSelected ? 'bg-gray-100 border border-gray-200 shadow' : 'hover:bg-gray-100'}`}
          onClick={() => setSelectedChat(chat)}
        >
          <div className="flex-shrink-0 w-[60px] h-[50px] rounded-lg overflow-hidden bg-gray-200">
            {chat.propertyPhoto ? (
              <img
                src={chat.propertyPhoto}
                alt="apartment"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                No image
              </div>
            )}
          </div>

          <div className="flex flex-col flex-1 overflow-hidden">
            <p className="text-[15px] font-semibold truncate">
              {chat.propertyTitle}
            </p>
            <p className="text-sm text-gray-600 truncate">
              {lastMsg || 'Ще немає повідомлень'}
            </p>
          </div>

          <div className="flex-shrink-0 text-[12px] text-gray-400 ml-2 whitespace-nowrap">
            {new Date(chat.lastMessageAt).toLocaleDateString('uk-UA', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            })}
          </div>
          {numberNewMessages > 0 && (
            <div className="absolute top-[-10px] right-[20px] flex items-center justify-center w-[20px] h-[20px] bg-white border border-gray-400 rounded-full">
              <span className="text-[12px] font-medium text-black mt-[1px]">
                {numberNewMessages}
              </span>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center backdrop-blur-[3px] bg-white/70 z-50">
      <div className="relative w-[80vw] h-[80vh] bg-white rounded-lg shadow-lg p-4 flex">
        {/* Кнопка закриття */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
          aria-label="Close dialog"
        >
          <IoMdClose />
        </button>

        {/* Ліва колонка — список чатів */}
        <div className="w-[30%] h-full overflow-y-auto pr-3 border-r border-gray-200">
          <Text type="regular" as="h2" fontWeight="bold" className="mb-4">
            My chats:
          </Text>
          {renderChatsList()}
        </div>

        {/* Права частина — сам чат */}
        <div className="w-[70%] h-full pl-4 flex items-center justify-center">
          <div className="w-full">
            {selectedChat && currentUserId ? (
              <Chat
                key={selectedChat._id}
                userId={currentUserId}
                ownerId={selectedChat.users.find(id => id !== currentUserId)!}
                apartmentId={selectedChat.propertyId}
              />
            ) : userChats.length === 0 ? (
              <div className="text-gray-500 text-center px-4">
                У вас ще немає чатів
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogWindow;
