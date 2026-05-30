import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { OffersElementType } from '../types/offers';
import { OfferType } from '../types/offer';

export const changeCity = createAction<string>('city/changeCity');
export const resetCity = createAction<void>('city/resetCity');

export const loadOffers = createAction<OffersElementType[]>('offers/loadOffers');

export const loadNearOffers = createAction<OffersElementType[]>('offers/loadNearOffers');

export const changeSorting = createAction<string>('sorting/changeSorting');
export const resetSorting = createAction<void>('sorting/resetSorting');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const selectOffer = createAction<OfferType>('data/saveOffer');
export const unselectOffer = createAction<void>('data/resetOffer');
