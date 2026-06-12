import { createAction } from '@reduxjs/toolkit';
import { FavoriteType } from '../types/favorite';

export const changeCity = createAction<string>('city/changeCity');

export const changeSorting = createAction<string>('sorting/changeSorting');

export const setErrorType = createAction<string | null>('error/setErrorType');

// TODO: Rename!!!
export const updateFavoriteSelectedOffer = createAction<FavoriteType>('offers/updateOffer');
// TODO: Rename!!!
export const updateFavoriteOffers = createAction<FavoriteType>('offers/updateFavoriteOffers');

