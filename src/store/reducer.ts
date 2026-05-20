// Import Create Reducer
import { createReducer } from '@reduxjs/toolkit';
// Import Actions
import { changeCity, resetCity, clearOffers, changeSorting, resetSorting } from './action';
// Import Constants
import { DEFAULT_CITY, DEFAULT_SORTING } from '../const';
// Import Mocks
import { OFFERS } from '../mocks/offers-mocks';

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
    .addCase(changeSorting, (state, action) => {
      state.sortingOffers = action.payload;
    })
    .addCase(resetSorting, (state) => {
      state.sortingOffers = initialState.sortingOffers;
    });
});

