import { createSlice } from '@reduxjs/toolkit';
import { ITechnicalState } from '../../types/store/store-technical';

const initialState: ITechnicalState = {
  error: '',
  message: '',
  hideHeaderFooter: false,
  screenType: 'isDesctop',
  modalWindowStatus: false,
  infoUserId: '6682a23d394df5a1c56b1248f',
  currency: '',
  exchangeRate: 0,
  exchangeRateData: {},
  loading: false,
  updatedWeather: [],
  paymentStage: 'stage-1',
  paymentData: {
    propertyId: null,
    propertyName: null,
    propertyImg: null,
    location: {},
    ranking: 0,
    usersFeedback: [],
    servicesList: [],
    pricePerNight: 0,
    typePayment: null,
    owner: {
      id: '',
      name: '',
      phone: '',
      email: '',
    },
  },
};

const technical = createSlice({
  name: 'technical',
  initialState,
  reducers: {
    setPaymentData: (store, action) => {
      store.paymentData = action.payload;
    },
    setUpdatedWeather: (store, action) => {
      const { id, ...newWeatherData } = action.payload;
      store.updatedWeather = store.updatedWeather.filter(
        weather => weather.id !== id
      );
      store.updatedWeather.push({ id, ...newWeatherData });
    },
    setMessage: (store, action) => {
      store.message = action.payload;
    },
    clearTechnicalError: store => {
      store.error = '';
    },
    clearTechnicalMessage: store => {
      store.message = '';
    },
    setScreenType: (store, action) => {
      store.screenType = action.payload;
    },
    setModalWindowStatus: (store, action) => {
      store.modalWindowStatus = action.payload;
    },
    setTechnicalError: (store, action) => {
      store.error = action.payload;
    },
    setCurrency: (store, action) => {
      store.currency = action.payload;
    },
    setExchangeRateData: (store, action) => {
      store.exchangeRateData = action.payload as Record<string, number>;

      const firstEntry = Object.entries(store.exchangeRateData)[0];

      if (firstEntry) {
        const [firstKey, firstValue] = firstEntry;
        store.exchangeRate = firstValue;
        store.currency = firstKey;
      }
    },
    setUpdateExchangeRate: (store, action) => {
      store.currency = action.payload;
      store.exchangeRate = store.exchangeRateData[action.payload];
    },
    setPaymentStage: (store, action) => {
      store.paymentStage = action.payload;
    },
  },

  // extraReducers: (builder) => {
  // }
});

export default technical.reducer;

export const {
  clearTechnicalError,
  clearTechnicalMessage,
  setScreenType,
  setModalWindowStatus,
  setTechnicalError,
  setCurrency,
  setExchangeRateData,
  setUpdateExchangeRate,
  setMessage,
  setUpdatedWeather,
  setPaymentStage,
  setPaymentData,
} = technical.actions;
