import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction<string>('city/changeCity');

export const changeSorting = createAction<string>('sorting/changeSorting');
