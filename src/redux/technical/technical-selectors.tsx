import { RootState } from '../store';

export const getTechnicalError = (state: RootState) => state.technical.error;
export const getTechnicalMessage = (state: RootState) =>
  state.technical.message;
export const getScreenType = (state: RootState) => state.technical.screenType;
export const getModalVindowSttus = (state: RootState) =>
  state.technical.modalWindowStatus;
export const getExchangeRate = (state: RootState) =>
  state.technical.exchangeRate;
export const getExchangeRateData = (state: RootState) =>
  state.technical.exchangeRateData;

export const getLoadingTechnical = (state: RootState) =>
  state.technical.loading;
export const getCurrency = (state: RootState) => state.technical.currency;
