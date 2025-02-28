import { IProperty } from './property';

export interface IPropertyRegister {
  title: string;
  location: {
    city: string;
    street: string;
    building: string;
    apartment?: string;
  };
  description: string;
  owner: {
    email: string;
    name: string;
    phone: string;
    id: string;
  };
  accommodation: {
    livingRooms: string;
    qtyAdults: string;
    qtyChildrens: string;
  };
  price: {
    value: string;
    currency: string;
  };
  category: string;
  servicesList?: string[];
  mainImage?: string;
  imagesLink?: string[];
}

export interface IPropertyRegisterResponse {
  message: string;
}

export interface ILikeProperty {
  propertyId: string;
}

export interface ILikePropertyResponse {
  message: string;
}

export interface IPropertyTypesArrayResponse {
  propertyTypes: IProperty[];
}
