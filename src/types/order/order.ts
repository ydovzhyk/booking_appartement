import {ISearchConditions} from '../search/search';
export interface IOrder {
  orderCriteria: ISearchConditions;
  amountInfo: {
    totalPrice: number;
    currency: string;
  };
  clientData: {
    clientId?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    specialRequests: string;
  };
  paymentData: {
    paymentComment: string;
    paymentMethod: {
      creditCard?: {
        cardNumber: string;
        cardHolder: string;
        expirationDate: string;
        cvv: string;
      };
      payPalExpress?: {
        email: string;
      };
      bankTransfer?: {
        accountName: string;
        accountNumber: string;
        iban: string;
        swiftCode: string;
        paymentReference: string;
      };
    };
  };
}
