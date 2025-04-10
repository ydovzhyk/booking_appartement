import { Review } from '@/components/shared/slider-review/slider-review';
export interface IProperty {
  _id: string;
  dateCreated: string;
  title: string;
  location: {
    city: string;
    street: string;
    building: string;
    apartment?: string;
  };
  geoCoords: {
    lat: number;
    lng: number;
    comments: string;
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
  mainImage: string;
  imagesLink: string[];
  bookingDates?: string[];
  ranking: number;
  usersFeedback?: Review[] | undefined;
}
