// Import Create Action
import { createAction } from '@reduxjs/toolkit';
// Create Actions
// City
export const changeCity = createAction<string>('city/changeCity');
export const resetCity = createAction<void>('city/resetCity');
// Offers
export const clearOffers = createAction<void>('offers/clearOffers');
export const sortOffers = createAction<void>('offers/sortOffers');
export const resetOffers = createAction<void>('offers/resetOffers');
// Sorting
export const changeSorting = createAction<string>('sorting/changeSorting');
export const resetSorting = createAction<void>('sorting/resetSorting');
