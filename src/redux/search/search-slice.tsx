import { createSlice } from '@reduxjs/toolkit';
import { ISearchState } from '../../types/store/store-search';

const initialState: ISearchState = {
  error: '',
  message: '',
  loading: false,
  searchConditions: {
    numberAdults: 1,
    numberChildren: 0,
    numberRooms: 1,
    petsAllowed: false,
    dateFrom: '',
    dateTo: '',
    city: '',
    propertyType: '',
    propertyId: '',
  },
};

const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setMessage: (store, action) => {
      store.message = action.payload;
    },
    clearSearchError: store => {
      store.error = '';
    },
    clearSearchMessage: store => {
      store.message = '';
    },
    setSearchConditions: (store, action) => {
      store.searchConditions.numberAdults =
        action.payload.numberAdults ?? store.searchConditions.numberAdults;
      store.searchConditions.numberChildren =
        action.payload.numberChildren ?? store.searchConditions.numberChildren;
      store.searchConditions.numberRooms =
        action.payload.numberRooms ?? store.searchConditions.numberRooms;
      store.searchConditions.petsAllowed =
        action.payload.petsAllowed ?? store.searchConditions.petsAllowed;
      store.searchConditions.dateFrom =
        action.payload.dateFrom ?? store.searchConditions.dateFrom;
      store.searchConditions.dateTo =
        action.payload.dateTo ?? store.searchConditions.dateTo;
      store.searchConditions.city =
        action.payload.city ?? store.searchConditions.city;
    },
  },

  // extraReducers: (builder) => {
  // }
});

export default search.reducer;

export const {
  clearSearchError,
  clearSearchMessage,
  setSearchConditions,
  setMessage,
} = search.actions;
