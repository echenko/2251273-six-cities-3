import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OffersSlice } from '../../types/slice/offers-slice';
import { fetchOffersAction, fetchNearOffersAction, fetchFavoriteOffersAction } from '../api-actions';

const initialState: OffersSlice = {
  offers: [],
  offersLoadingStatus: null,
  nearOffers: [],
  nearOffersLoadingStatus: null,
  favoriteOffers: [],
  favoriteOffersLoadingStatus: null,
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.offersLoadingStatus = true;
      })
      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
        state.nearOffersLoadingStatus = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.favoriteOffersLoadingStatus = true;
      })
      .addCase(fetchOffersAction.pending, (state) => {
        state.offersLoadingStatus = null;
      })
      .addCase(fetchNearOffersAction.pending, (state) => {
        state.nearOffersLoadingStatus = null;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.favoriteOffersLoadingStatus = null;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offersLoadingStatus = false;
      })
      .addCase(fetchNearOffersAction.rejected, (state) => {
        state.nearOffersLoadingStatus = false;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.favoriteOffersLoadingStatus = false;
      });
  }
});
