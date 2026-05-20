// Import Create Reducer
import { createReducer } from '@reduxjs/toolkit';
// Import Actions
import { changeCity, resetCity, clearOffers, sortOffers, resetOffers, changeSorting, resetSorting } from './action';
// Import Constants
import { DEFAULT_CITY, DEFAULT_SORTING } from '../const';
// Import Mocks
import { OFFERS } from '../mocks/offers-mocks';

import { getSortedOffersByType } from '../utils';

const initialState = {
  city: DEFAULT_CITY,
  offers: OFFERS,
  sortingOffers: DEFAULT_SORTING,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(resetCity, (state) => {
      state.city = initialState.city;
    })
    .addCase(clearOffers, (state) => {
      state.offers = [];
    })
    .addCase(sortOffers, (state) => {
      state.offers = getSortedOffersByType(state.offers, state.sortingOffers);
    })
    .addCase(resetOffers, (state) => {
      state.offers = initialState.offers;
    })
    .addCase(changeSorting, (state, action) => {
      state.sortingOffers = action.payload;
    })
    .addCase(resetSorting, (state) => {
      state.sortingOffers = initialState.sortingOffers;
      state.offers = initialState.offers;
    });
});

