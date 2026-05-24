import { createReducer } from '@reduxjs/toolkit';

import {
  changeCity, resetCity,
  loadOffers,
  changeSorting, resetSorting,
  requireAuthorization,
} from './action';

import { DEFAULT_CITY, DEFAULT_SORTING, AuthorizationStatus } from '../const';

import { OffersElementType } from '../types/offers';

type InitialStateType = {
  city: string;
  offers: OffersElementType[];
  typeSorting: string;
  AuthorizationStatus: AuthorizationStatus;
  isLoadingDataOffers: boolean;
};

const initialState: InitialStateType = {
  city: DEFAULT_CITY,
  offers: [],
  typeSorting: DEFAULT_SORTING,
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
    .addCase(changeSorting, (state, action) => {
      state.typeSorting = action.payload;
    })
    .addCase(resetSorting, (state) => {
      state.typeSorting = initialState.typeSorting;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.AuthorizationStatus = action.payload;
    });
});

