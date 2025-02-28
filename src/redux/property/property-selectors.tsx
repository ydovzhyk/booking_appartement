import { RootState } from '../store';

export const getPropertyError = (state: RootState) => state.property.error;
export const getPropertyMessage = (state: RootState) => state.property.message;
export const getProperty = (state: RootState) => state.property.property;
export const getPropertyTypes = (state: RootState) =>
  state.property.propertyTypes;
export const getPropertyDetail = (state: RootState) =>
  state.property.propertyDetail;
