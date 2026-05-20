// Import Create Action
import { createAction } from '@reduxjs/toolkit';
// Create Actions
// City
export const changeCity = createAction<string>('city/changeCity');
export const resetCity = createAction<void>('city/resetCity');
// Offers
export const clearOffers = createAction<void>('offers/clearOffers');
// Sorting
export const changeSorting = createAction<string>('sorting/changeSorting');
export const resetSorting = createAction<void>('sorting/resetSorting');
