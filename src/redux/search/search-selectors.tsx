import { RootState } from '../store';

export const getSearchError = (state: RootState) => state.search.error;
export const getSearchMessage = (state: RootState) => state.search.message;
export const getSearchConditions = (state: RootState) =>
  state.search.searchConditions;
export const getAvailable = (state: RootState) => state.search.available;
