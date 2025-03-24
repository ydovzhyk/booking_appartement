import { useEffect, useRef, useState } from 'react';
import { useSocketRef } from './useSocket';
import {
  subscribeToUserStatus,
  unsubscribeFromUserStatus,
} from './socketHelper';

export const useOnlineStatus = (targetUserId: string) => {
  const socket = useSocketRef();
  const [isOnline, setIsOnline] = useState(false);

  const watchedUserIdRef = useRef<string | null>(null); // ⬅️ Запам’ятовуємо, за ким спостерігаємо

  useEffect(() => {
    if (!socket || !targetUserId) return;

    const handleOnline = (userId: string) => {
      if (userId === targetUserId) setIsOnline(true);
    };

    const handleOffline = (userId: string) => {
      if (userId === targetUserId) setIsOnline(false);
    };

    // Якщо вже слідкуємо за цим користувачем — нічого не робимо
    if (watchedUserIdRef.current === targetUserId) return;

    // Відписка від попереднього
    if (watchedUserIdRef.current) {
      socket.emit('unwatch-user', { targetUserId: watchedUserIdRef.current });
      unsubscribeFromUserStatus(socket, handleOnline, handleOffline);
    }

    // Підписка на нового
    socket.emit('watch-user', { targetUserId });
    watchedUserIdRef.current = targetUserId;

    subscribeToUserStatus(socket, handleOnline, handleOffline);

    return () => {
      unsubscribeFromUserStatus(socket, handleOnline, handleOffline);
      socket.emit('unwatch-user', { targetUserId });
      watchedUserIdRef.current = null;
    };
  }, [socket, targetUserId]);

  return isOnline;
};
