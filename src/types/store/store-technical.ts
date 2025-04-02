import { IUpdatedWeather } from '../technical/technical';
export interface ITechnicalState {
  error: string;
  message: string;
  hideHeaderFooter: boolean;
  screenType: string;
  modalWindowStatus: boolean;
  currency: string;
  exchangeRateData: object;
  exchangeRate: number;
  totalAmountCurrency: number;
  loading: boolean;
  updatedWeather: IUpdatedWeather[];
  paymentStage: string;
  paymentData: object;
}
