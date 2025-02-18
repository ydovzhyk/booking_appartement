import { IProperty } from "../property/property";

export interface IPropertyStore {
  property: IProperty | null;
  properties: IProperty[];
  loading: boolean;
  error: string;
  message: string;
}
