import { IUpdatedWeather } from '../technical/technical';
export interface ITechnicalState {
  error: string;
  message: string;
  hideHeaderFooter: boolean;
  screenType: string;
  modalWindowStatus: boolean;
  infoUserId: string;
  currency: string;
  exchangeRateData: object;
  exchangeRate: number;
  loading: boolean;
  updatedWeather: IUpdatedWeather[];
  paymentStage: string;
  paymentData: {
    propertyId: string | null;
    propertyName: string | null;
    propertyImg: string | null;
    location: any;
    ranking: number;
    usersFeedback: any[];
    servicesList: any[];
    pricePerNight: number;
    typePayment: string | null;
    owner: {
      id: string;
      name: string;
      phone: string;
      email: string;
    } | null;
  };
}
