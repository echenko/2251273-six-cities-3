import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { SortingSlice } from '../../types/slice/sorting-slice';
import { changeSorting } from '../action';
import { DEFAULT_SORTING } from '../../const';

const initialState: SortingSlice = {
  SelectedSorting: DEFAULT_SORTING,
};

export const sortingSlice = createSlice({
  name: NameSpace.Sorting,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(changeSorting, (state, action) => {
        state.SelectedSorting = action.payload;
      });
  },
});
