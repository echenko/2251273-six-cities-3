import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, DEFAULT_CITY } from '../../const';
import { CitySlice } from '../../types/slice/city-slice';
import { changeCity } from '../action';

const initialState: CitySlice = {
  SelectedCity: DEFAULT_CITY,
};

export const citySlice = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(changeCity, (state, action) => {
        state.SelectedCity = action.payload;
      });
  },
});
