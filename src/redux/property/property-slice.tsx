import { createSlice } from '@reduxjs/toolkit';
import {
  registerProperty,
  likeProperty,
  propertyTypesArray,
} from './property-operations';
import { IPropertyStore } from '../../types/store/store-property';

const initialState: IPropertyStore = {
  loading: false,
  error: '',
  message: '',
  properties: [],
  propertyTypes: [],
  property: {
    _id: '',
    dateCreated: '',
    title: '',
    location: {
      city: '',
      street: '',
      building: '',
      apartment: '',
    },
    description: '',
    owner: {
      email: '',
      name: '',
      phone: '',
      id: '',
    },
    accommodation: {
      livingRooms: '',
      qtyAdults: '',
      qtyChildrens: '',
    },
    price: {
      value: '',
      currency: '',
    },
    category: '',
    servicesList: [],
    mainImage: '',
    imagesLink: [],
    bookingDates: [],
    ranking: 0,
    usersFeedback: [],
  },
};


const property = createSlice({
  name: 'property',
  initialState,
  reducers: {
    clearPropertyError: store => {
      store.error = '';
    },
    clearPropertyMessage: store => {
      store.message = '';
    },
  },

  extraReducers: builder => {
    // * REGISTER PROPERTY
    builder.addCase(registerProperty.pending, store => {
      store.loading = true;
      store.error = '';
    });
    builder.addCase(registerProperty.fulfilled, (store, action) => {
      store.loading = false;
      store.message = action.payload.message;
    });
    builder.addCase(registerProperty.rejected, (store, action: any) => {
      store.loading = false;
      store.error =
        action.payload.data?.message || 'Oops, something went wrong, try again';
    });
    // * LIKE PROPERTY
    builder.addCase(likeProperty.pending, store => {
      store.loading = true;
      store.error = '';
    });
    builder.addCase(likeProperty.fulfilled, (store, action) => {
      store.loading = false;
      store.message = action.payload.message;
    });
    builder.addCase(likeProperty.rejected, (store, action: any) => {
      store.loading = false;
      store.error =
        action.payload.data?.message || 'Oops, something went wrong, try again';
    });
    // * GET TYPES PROPERTY ARRAY
    builder.addCase(propertyTypesArray.pending, store => {
      store.loading = true;
      store.error = '';
    });
    builder.addCase(propertyTypesArray.fulfilled, (store, action) => {
      store.loading = false;
      store.propertyTypes = action.payload.propertyTypes;
    });
    builder.addCase(propertyTypesArray.rejected, (store, action: any) => {
      store.loading = false;
      store.error =
        action.payload.data?.message || 'Oops, something went wrong, try again';
    });
  },
});

export default property.reducer;
export const {
  clearPropertyError,
  clearPropertyMessage,
} = property.actions;
