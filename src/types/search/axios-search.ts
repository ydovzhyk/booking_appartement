import { ISearchConditions } from './search';

export interface ISearchRegister {
  searchConditions: ISearchConditions;
}

export interface ISearchResponse {
  message: string;
}
