import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction<string>('city/changeCity');

export const changeSorting = createAction<string>('sorting/changeSorting');

export const setErrorType = createAction<string | null>('error/setErrorType');
export const setErrorMessage = createAction<string>('error/setErrorMessage');
