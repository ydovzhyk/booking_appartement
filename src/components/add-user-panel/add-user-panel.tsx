'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/redux/auth/auth-selectors';
import { getCurrentUser } from '@/redux/auth/auth-operations';
import { RootState } from '@/redux/store';
import { AppDispatch } from '@/redux/store';
import { useSocketRef } from '@/hooks/useSocket';
import { CiMail, CiHeart } from 'react-icons/ci';

const AddUserPanel: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(getUser);
  const authData = useSelector((state: RootState) => state.auth);
  const numberNewMessages = user?.newMessages?.length || 0;
  const numberNewLikes = user?.likedApartments?.length || 0;

  useEffect(() => {
    const socket = useSocketRef();
    console.log('🔌 useSocketRef result:', socket);

    if (!socket) {
      console.warn('⚠️ Socket not available');
      return;
    }

    console.log('📡 Subscribing to user-new-message event');

    const handleNewUserMessage = () => {
      console.log('📨 Received user-new-message event');
      if (authData.accessToken && authData.refreshToken && authData.sid) {
        console.log('🔁 Dispatching getCurrentUser');
        dispatch(
          getCurrentUser({
            accessToken: authData.accessToken,
            refreshToken: authData.refreshToken,
            sid: authData.sid,
          })
        );
      } else {
        console.warn('⚠️ Missing auth tokens, skipping getCurrentUser');
      }
    };

    socket.on('user-new-message', handleNewUserMessage);

    return () => {
      console.log('❌ Cleaning up user-new-message listener');
      socket.off('user-new-message', handleNewUserMessage);
    };
  }, [dispatch, authData.accessToken, authData.refreshToken, authData.sid]);

  // useEffect(() => {
  //   const socket = useSocketRef();
  //   if (!socket) return;

  //   const handleNewUserMessage = () => {
  //     if (authData.accessToken && authData.refreshToken && authData.sid) {
  //       dispatch(
  //         getCurrentUser({
  //           accessToken: authData.accessToken,
  //           refreshToken: authData.refreshToken,
  //           sid: authData.sid,
  //         })
  //       );
  //     }
  //   };

  //   socket.on('user-new-message', handleNewUserMessage);

  //   return () => {
  //     socket.off('user-new-message', handleNewUserMessage);
  //   };
  // }, [dispatch, authData.accessToken, authData.refreshToken, authData.sid]);

  return (
    <div className="flex flex-row items-center gap-[15px] mr-[20px]">
      <div className="relative flex flex-row items-center justify-center cursor-pointer">
        {numberNewMessages > 0 && (
          <div className="absolute top-[-5px] right-[-5px] flex items-center justify-center w-[20px] h-[20px] bg-white border-white border-[1px] rounded-full">
            <span className="text-[14px] font-normal text-black mt-[2px]">
              {numberNewMessages}
            </span>
          </div>
        )}
        <CiMail size={30} color="white" className="hover:scale-110" />
      </div>
      <div className="relative flex flex-row items-center justify-center cursor-pointer">
        {numberNewLikes > 0 && (
          <div className="absolute top-[-5px] right-[-5px] flex items-center justify-center w-[20px] h-[20px] bg-white border-white border-[1px] rounded-full">
            <span className="text-[14px] font-normal text-black mt-[2px]">
              {numberNewLikes}
            </span>
          </div>
        )}
        <CiHeart size={31} color="white" className="hover:scale-110" />
      </div>
    </div>
  );
};

export default AddUserPanel;
