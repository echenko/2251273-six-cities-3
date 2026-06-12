import { createAction } from '@reduxjs/toolkit';
import { FavoriteType } from '../types/favorite';
import { ErrorType } from '../types/error';

export const changeCity = createAction<string>('city/changeCity');

export const changeSorting = createAction<string>('sorting/changeSorting');

export const setErrorType = createAction<ErrorType | null>('error/setErrorType');

// TODO: Rename!!!
export const updateFavoriteSelectedOffer = createAction<FavoriteType>('offers/updateOffer');
// TODO: Rename!!!
export const updateFavoriteOffers = createAction<FavoriteType>('offers/updateFavoriteOffers');

