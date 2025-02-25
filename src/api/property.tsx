import { instance } from './auth';
import {
  IPropertyRegister,
  IPropertyRegisterResponse,
} from './../types/property/axios-property';
import {
  ISearchRegister,
  ISearchResponse,
} from './../types/search/axios-search';

export const axiosRegisterProperty = async (
  propertyData: IPropertyRegister | FormData
): Promise<IPropertyRegisterResponse> => {
  const { data }: { data: IPropertyRegisterResponse } = await instance.post(
    '/apartments/create',
    propertyData,
    {
      headers:
        propertyData instanceof FormData
          ? { 'Content-Type': 'multipart/form-data' }
          : { 'Content-Type': 'application/json' },
    }
  );
  return data;
};

export const axiosSearchProperty = async (
  searchData: ISearchRegister
): Promise<ISearchResponse> => {
  const { data }: { data: ISearchResponse } = await instance.post(
    '/apartments/search', searchData
  );
  return data;
};