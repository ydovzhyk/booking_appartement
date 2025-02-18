import { RootState } from '../store';

export const getPropertyError = (state: RootState) => state.property.error;
export const getPropertyMessage = (state: RootState) => state.property.message;
export const getProperty = (state: RootState) => state.property.property;
