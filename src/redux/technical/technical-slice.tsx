import { createSlice } from '@reduxjs/toolkit';
import { ITechnicalState } from '../../types/store/store-technical';

const initialState: ITechnicalState = {
    error: '',
    message: '',
    hideHeaderFooter: false,
    screenType: 'isDesctop',
    modalWindowStatus: false,
};

const technical = createSlice({
    name: 'technical',
    initialState,
    reducers: {
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
            store.modalWindowStatus= action.payload;
        },
        setTechnicalError: (store, action) => {
            store.error = action.payload;
        },
    },

    extraReducers: (builder) => {
    }
});

export default technical.reducer;

export const {
    clearTechnicalError,
    clearTechnicalMessage,
    setScreenType,
    setModalWindowStatus,
    setTechnicalError,
} = technical.actions;