import { useEffect, useState } from 'react';
import { useSocketRef } from './useSocket';
import {
  subscribeToUserStatus,
  unsubscribeFromUserStatus,
} from './socketHelper';

export const useOnlineStatus = (targetUserId: string) => {
  const socket = useSocketRef();
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (!socket || !targetUserId) return;

    const handleOnline = (userId: string) => {
      if (userId === targetUserId) setIsOnline(true);
    };

    const handleOffline = (userId: string) => {
      if (userId === targetUserId) setIsOnline(false);
    };

    subscribeToUserStatus(socket, handleOnline, handleOffline);

    return () => {
      unsubscribeFromUserStatus(socket, handleOnline, handleOffline);
    };
  }, [socket, targetUserId]);

  return isOnline;
};
