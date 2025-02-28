import { IProperty } from '../property/property';

export interface IPropertyStore {
  propertyDetail: IProperty | null;
  property: IProperty | null;
  properties: IProperty[];
  propertyTypes: IProperty[];
  loading: boolean;
  error: string;
  message: string;
}
