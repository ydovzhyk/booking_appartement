import { RootState } from '../store';

export const getTechnicalError = (state: RootState) => state.technical.error
export const getTechnicalMessage = (state: RootState) => state.technical.message;
export const getScreenType = (state: RootState) => state.technical.screenType;
export const getModalVindowSttus = (state: RootState) => state.technical.modalWindowStatus;