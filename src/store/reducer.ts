import { createReducer } from '@reduxjs/toolkit';

import {
  changeCity, resetCity,
  loadOffers, clearOffers, sortOffers, resetOffers,
  changeSorting, resetSorting,
  requireAuthorization,
} from './action';

import { DEFAULT_CITY, DEFAULT_SORTING, AuthorizationStatus } from '../const';

import { OffersElementType } from '../types/offers';

import { getSortedOffersByType } from '../utils';

type InitialStateType = {
  city: string;
  offers: OffersElementType[];
  sortingOffers: string;
  AuthorizationStatus: AuthorizationStatus;
  isLoadingDataOffers: boolean;
};

const initialState: InitialStateType = {
  city: DEFAULT_CITY,
  offers: [],
  sortingOffers: DEFAULT_SORTING,
  AuthorizationStatus: AuthorizationStatus.Unknown,
  isLoadingDataOffers: false
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
    .addCase(clearOffers, (state) => {
      state.offers = [];
    })
    .addCase(sortOffers, (state) => {
      state.offers = getSortedOffersByType(state.offers, state.sortingOffers) ;
    })
    .addCase(resetOffers, (state) => {
      state.offers = initialState.offers;
    })
    .addCase(changeSorting, (state, action) => {
      state.sortingOffers = action.payload;
    })
    .addCase(resetSorting, (state) => {
      state.sortingOffers = initialState.sortingOffers;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.AuthorizationStatus = action.payload;
    });
});

