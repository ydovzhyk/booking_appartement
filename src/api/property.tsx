import { instance } from './auth';
import {
  IPropertyRegister,
  IPropertyRegisterResponse,
} from './../types/property/axios-property';

export const axiosRegisterProperty = async (
  propertyData: IPropertyRegister | FormData
): Promise<IPropertyRegisterResponse> => {
  const { data }: { data: IPropertyRegisterResponse } = await instance.post(
    '/apartments/create',
    propertyData,
    {
      headers: propertyData instanceof FormData
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' },
    }
  );
  return data;
};
