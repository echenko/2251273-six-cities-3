import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, DEFAULT_SORTING } from '../../const';
import { SortingSlice } from '../../types/slice/sorting-slice';
import { changeSorting } from '../action';

const initialState: SortingSlice = {
  selectedSorting: DEFAULT_SORTING,
};

export const sortingSlice = createSlice({
  name: NameSpace.Sorting,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(changeSorting, (state, action) => {
        state.selectedSorting = action.payload;
      });
  },
});
