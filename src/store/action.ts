import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { OffersElementType } from '../types/offers';
import { OfferType } from '../types/offer';
import { CommentElementType } from '../types/comments';

export const changeCity = createAction<string>('city/changeCity');
export const resetCity = createAction<void>('city/resetCity');

export const loadOffers = createAction<OffersElementType[]>('offers/loadOffers');
export const setOffersLoadingStatus = createAction<boolean | null>('offers/setOffersLoadingStatus');

export const loadNearOffers = createAction<OffersElementType[]>('offers/loadNearOffers');

export const changeSorting = createAction<string>('sorting/changeSorting');
export const resetSorting = createAction<void>('sorting/resetSorting');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const loadSelectedOffer = createAction<OfferType | null>('data/saveOffer');
export const setSelectedOfferLoadingStatus = createAction<boolean | null>('data/saveOfferLoadingStatus');

export const loadCommentsOffer = createAction<CommentElementType[]>('data/loadCommentsOffer');
