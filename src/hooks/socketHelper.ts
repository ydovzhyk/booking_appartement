import io from 'socket.io-client';

type OnlineStatusCallback = (userId: string) => void;

export const subscribeToUserStatus = (
  socket: ReturnType<typeof io>,
  onOnline: OnlineStatusCallback,
  onOffline: OnlineStatusCallback
) => {
  socket.on('user-online', onOnline);
  socket.on('user-offline', onOffline);
};

export const unsubscribeFromUserStatus = (
  socket: ReturnType<typeof io>,
  onOnline: OnlineStatusCallback,
  onOffline: OnlineStatusCallback
) => {
  socket.off('user-online', onOnline);
  socket.off('user-offline', onOffline);
};
