import { instance } from './auth';
import {
  IPropertyRegister,
  IPropertyRegisterResponse,
  ILikeProperty,
  ILikePropertyResponse,
  IPropertyTypesArrayResponse,
} from './../types/property/axios-property';
import {
  ISearchRegister,
  ISearchResponse,
} from './../types/search/axios-search';
import { IProperty } from '@/types/property/property';

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
  console.log('searchData', searchData);
  const { data }: { data: ISearchResponse } = await instance.post(
    '/apartments/search',
    searchData
  );
  return data;
};

export const axiosLikeProperty = async (
  userData: ILikeProperty
): Promise<ILikePropertyResponse> => {
  const { data }: { data: ILikePropertyResponse } = await instance.post(
    '/apartments/like',
    userData
  );
  return data;
};

export const axiosPropertyTypesArray =
  async (): Promise<IPropertyTypesArrayResponse> => {
    const { data }: { data: IPropertyTypesArrayResponse } =
      await instance.get('/apartments/type');
    return data;
  };

export const axiosGetDetailProperty = async (
  id: string
): Promise<IProperty> => {
  const { data }: { data: IProperty } = await instance.get(`/apartments/${id}`);
  return data;
};