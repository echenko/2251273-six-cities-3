import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OfferSlice } from '../../types/slice/offer-slice';
import { fetchOfferAction, fetchCommentsOfferAction } from '../api-actions';
import { updateFavoriteSelectedOffer } from '../action';

const initialState: OfferSlice = {
  selectedOffer: null,
  selectedOfferLoadingStatus: null,
  selectedOfferComments: [],
  selectedOfferCommentsLoadingStatus: null,
};

export const offerSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.selectedOffer = action.payload;
        state.selectedOfferLoadingStatus = true;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.selectedOfferLoadingStatus = null;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.selectedOfferLoadingStatus = false;
      })
      .addCase(fetchCommentsOfferAction.fulfilled, (state, action) => {
        state.selectedOfferComments = action.payload;
        state.selectedOfferCommentsLoadingStatus = true;
      })
      .addCase(fetchCommentsOfferAction.pending, (state) => {
        state.selectedOfferCommentsLoadingStatus = null;
      })
      .addCase(fetchCommentsOfferAction.rejected, (state) => {
        state.selectedOfferCommentsLoadingStatus = false;
      })
      .addCase(updateFavoriteSelectedOffer, (state, action) => {
        if (state.selectedOffer) {
          state.selectedOffer.isFavorite = action.payload.isFavorite;
        }
      });
  }
});
