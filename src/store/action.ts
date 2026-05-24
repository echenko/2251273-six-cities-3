import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { OffersElementType } from '../types/offers';

export const changeCity = createAction<string>('city/changeCity');
export const resetCity = createAction<void>('city/resetCity');

export const loadOffers = createAction<OffersElementType[]>('offers/loadOffers');
export const sortOffers = createAction<OffersElementType[]>('offers/sortOffers');

export const changeSorting = createAction<string>('sorting/changeSorting');
export const resetSorting = createAction<void>('sorting/resetSorting');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
