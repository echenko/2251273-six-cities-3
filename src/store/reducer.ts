import { createReducer } from '@reduxjs/toolkit';

import {
  changeCity, resetCity,
  loadOffers, sortOffers,
  changeSorting, resetSorting,
  requireAuthorization,
} from './action';

import { DEFAULT_CITY, DEFAULT_SORTING, AuthorizationStatus } from '../const';

import { OffersElementType } from '../types/offers';

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
    .addCase(sortOffers, (state, action) => {
      state.offers = action.payload;
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

