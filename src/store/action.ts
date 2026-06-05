import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer';
import { CommentElementType } from '../types/comments';

export const changeCity = createAction<string>('city/changeCity');

export const changeSorting = createAction<string>('sorting/changeSorting');


export const loadSelectedOffer = createAction<OfferType | null>('data/saveOffer');
export const setSelectedOfferLoadingStatus = createAction<boolean | null>('data/saveOfferLoadingStatus');

export const loadCommentsOffer = createAction<CommentElementType[]>('data/loadCommentsOffer');
