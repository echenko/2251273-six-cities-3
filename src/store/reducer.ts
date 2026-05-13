import { createReducer } from '@reduxjs/toolkit';

import { changeCity } from './action';

const initialState = {
  city: 'Amsterdam',
};

export const city = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    });
});

