import { ISearchConditions } from '../search/search';

export interface ISearchState {
  error: string;
  message: string;
  loading: boolean;
  available: string;
  searchConditions: ISearchConditions;
}
