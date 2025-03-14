export interface ISearchConditions {
  numberAdults: number;
  numberChildren: number;
  numberRooms: number;
  petsAllowed: boolean;
  dateFrom: string | undefined;
  dateTo: string | undefined;
  city: string;
  propertyType: string;
  propertyId: string;
}
