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
    days: 1,
    city: '',
    propertyType: '',
    propertyId: '',
  },
  available: 'false',
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
    clearAvailable: store => {
      store.available = 'null';
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

      const fromDate = action.payload.dateFrom
        ? new Date(action.payload.dateFrom)
        : store.searchConditions.dateFrom
          ? new Date(store.searchConditions.dateFrom)
          : null;

      const toDate = action.payload.dateTo
        ? new Date(action.payload.dateTo)
        : store.searchConditions.dateTo
          ? new Date(store.searchConditions.dateTo)
          : null;

      if (
        fromDate instanceof Date &&
        toDate instanceof Date &&
        !isNaN(fromDate.getTime()) &&
        !isNaN(toDate.getTime())
      ) {
        store.searchConditions.days = Math.max(
          Math.floor(
            (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)
          ),
          1
        );
      } else {
        store.searchConditions.days = 1;
      }
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
  clearAvailable,
} = search.actions;
