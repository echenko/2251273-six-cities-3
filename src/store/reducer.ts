import { createReducer } from '@reduxjs/toolkit';

import { changeCity, resetCity } from './action';

const initialState = {
  city: 'Amsterdam',
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

