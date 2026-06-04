import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { offersSlice } from '../store/slices/offers-slice';
import { citySlice } from '../store/slices/city-slice';
import { sortingSlice } from '../store/slices/sorting-slice';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersSlice.reducer,
  [NameSpace.City]: citySlice.reducer,
  [NameSpace.Sorting]: sortingSlice.reducer,

});
