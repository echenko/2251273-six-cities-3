
import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';

export const changeCity = createAction<string>('city/changeCity');
export const resetCity = createAction<void>('city/resetCity');

export const loadOffers = createAction<void>('offers/loadOffers');
export const clearOffers = createAction<void>('offers/clearOffers');
export const sortOffers = createAction<void>('offers/sortOffers');
export const resetOffers = createAction<void>('offers/resetOffers');

export const changeSorting = createAction<string>('sorting/changeSorting');
export const resetSorting = createAction<void>('sorting/resetSorting');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
