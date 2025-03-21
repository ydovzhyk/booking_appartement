export interface ISearchConditions {
  numberAdults: number;
  numberChildren: number;
  numberRooms: number;
  petsAllowed: boolean;
  dateFrom: string | undefined;
  dateTo: string | undefined;
  days: number;
  city: string;
  propertyType: string;
  apartmentId: string;
}
