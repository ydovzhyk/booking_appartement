import { ISearchConditions } from '../search/search';

export interface ISearchState {
  error: string;
  message: string;
  loading: boolean;
  searchConditions: ISearchConditions;
}
