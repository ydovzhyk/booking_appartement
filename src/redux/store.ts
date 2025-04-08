import { configureStore, Reducer } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistedState,
} from 'redux-persist';
import authReducer from './auth/auth-slice';
import technicalReducer from './technical/technical-slice';
import propertyReducer from './property/property-slice';
import searchReducer from './search/search-slice';
import cahatReducer from './chat/chat-slice';
import orderReducer from './order/order-slice';
import { IAuthStore } from '../types/store/store-auth';
import { setupInterceptors } from '../api/auth';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';

const isServer = typeof window === 'undefined';

const persistConfig = {
  key: 'auth-sid',
  storage,
  whitelist: ['sid', 'accessToken', 'refreshToken'],
  debug: process.env.NODE_ENV === 'development' ? true : false,
  suppressWarnings: true,
};

type AuthState = IAuthStore & Partial<{ _persist: PersistedState }>;

const finalAuthReducer: Reducer<AuthState> = isServer
  ? (authReducer as unknown as Reducer<AuthState>)
  : (persistReducer(
      persistConfig,
      authReducer
    ) as unknown as Reducer<AuthState>);

export const store = configureStore({
  reducer: {
    auth: finalAuthReducer,
    technical: technicalReducer,
    property: propertyReducer,
    search: searchReducer,
    chat: cahatReducer,
    order: orderReducer,
  },
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });

    // if (process.env.NODE_ENV === 'development') {
    //   middlewares.push(logger);
    // }

    return middlewares;
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = isServer ? null : persistStore(store);

setupInterceptors(store);
