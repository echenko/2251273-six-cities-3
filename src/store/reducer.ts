// Import Create Reducer
import { createReducer } from '@reduxjs/toolkit';
// Import Actions
import { changeCity, resetCity } from './action';
// Import Constants
import { DEFAULT_CITY } from '../const';

const initialState = {
  city: DEFAULT_CITY,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(resetCity, (state) => {
      state.city = initialState.city;
    });

});

