export interface IProperty {
  dateCreated?: string;
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
  servicesList?: string[];
  mainImage?: string;
  imagesLink?: string[];
  bookingDates?: string[];
  ranking?: number;
  usersFeedback?: string[];
}
