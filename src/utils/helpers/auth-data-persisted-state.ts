import { Store } from 'redux';
import { RootState } from '../../redux/store';

export function getAuthDataFromStorage(store: Store<RootState>) {
  const state = store.getState();
  const { accessToken, refreshToken, sid } = state.auth;
  if (accessToken) {
    return { accessToken, refreshToken, sid };
  }
  return null;
}
