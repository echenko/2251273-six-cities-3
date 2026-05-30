import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity, resetCity,
  loadOffers,
  loadNearOffers,
  changeSorting, resetSorting,
  requireAuthorization,
  selectOffer, unselectOffer
} from './action';
import { DEFAULT_CITY, DEFAULT_SORTING, AuthorizationStatus } from '../const';
import { OffersElementType } from '../types/offers';
import { OfferType } from '../types/offer';

type InitialStateType = {
  city: string;
  offers: OffersElementType[];
  typeSorting: string;
  AuthorizationStatus: AuthorizationStatus;
  selectedOffer: OfferType | null;
  nearOffers: OffersElementType[];
};

const initialState: InitialStateType = {
  city: DEFAULT_CITY,
  offers: [],
  typeSorting: DEFAULT_SORTING,
  AuthorizationStatus: AuthorizationStatus.Unknown,
  selectedOffer: null,
  nearOffers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(resetCity, (state) => {
      state.city = initialState.city;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadNearOffers, (state, action) => {
      state.nearOffers = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.typeSorting = action.payload;
    })
    .addCase(resetSorting, (state) => {
      state.typeSorting = initialState.typeSorting;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.AuthorizationStatus = action.payload;
    })
    .addCase(selectOffer, (state, action) => {
      state.selectedOffer = action.payload;
    })
    .addCase(unselectOffer, (state) => {
      state.selectedOffer = null;
    });
});

