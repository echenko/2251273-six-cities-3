import { fetchOfferAction, fetchCommentsOfferAction } from '../api-actions';
import { offerSlice } from './offer-slice';
import { OfferSlice } from '../../types/slice/offer-slice';
import { OFFER, COMMENTS } from '../../mocks/mock-offer';

describe('Reducer: offerSlice', () => {
  it('should return initial state', () => {
    const initialState: OfferSlice = {
      selectedOffer: null,
      selectedOfferLoadingStatus: null,
      selectedOfferComments: [],
      selectedOfferCommentsLoadingStatus: null,
    };

    expect(offerSlice.getInitialState()).toEqual(initialState);
  });

  it('should return initial state / unknown action', () => {
    const result = offerSlice.reducer(
      undefined,
      {
        type: 'unknown action',
      });

    expect(result).toEqual({
      selectedOffer: null,
      selectedOfferLoadingStatus: null,
      selectedOfferComments: [],
      selectedOfferCommentsLoadingStatus: null,
    });
  });

  it('should update selected offer', () => {
    const state = <OfferSlice>{
      selectedOffer: null,
      selectedOfferLoadingStatus: null,
      selectedOfferComments: [],
      selectedOfferCommentsLoadingStatus: null,
    };

    const resultState = <OfferSlice>{
      selectedOffer: OFFER,
      selectedOfferLoadingStatus: true,
      selectedOfferComments: [],
      selectedOfferCommentsLoadingStatus: null,
    };

    const action = {
      type: fetchOfferAction.fulfilled.type,
      payload: OFFER,
    };

    expect(offerSlice.reducer(state, action)).toEqual(resultState);
  });

  it('should update selected offer comments', () => {
    const state = <OfferSlice>{
      selectedOffer: null,
      selectedOfferLoadingStatus: null,
      selectedOfferComments: [],
      selectedOfferCommentsLoadingStatus: null,
    };

    const resultState = <OfferSlice>{
      selectedOffer: null,
      selectedOfferLoadingStatus: null,
      selectedOfferComments: COMMENTS,
      selectedOfferCommentsLoadingStatus: true,
    };

    const action = {
      type: fetchCommentsOfferAction.fulfilled.type,
      payload: COMMENTS,
    };

    expect(offerSlice.reducer(state, action)).toEqual(resultState);
  });

  it('should update selected offer loading status', () => {
    const state = <OfferSlice>{
      selectedOffer: null,
      selectedOfferLoadingStatus: null,
      selectedOfferComments: [],
      selectedOfferCommentsLoadingStatus: null,
    };

    const resultState = <OfferSlice>{
      selectedOffer: null,
      selectedOfferLoadingStatus: null,
      selectedOfferComments: [],
      selectedOfferCommentsLoadingStatus: null,
    };

    const action = {
      type: fetchOfferAction.pending.type,
    };

    expect(offerSlice.reducer(state, action)).toEqual(resultState);
  });

  it('should update selected offer comments loading status', () => {
    const state = <OfferSlice>{
      selectedOffer: null,
      selectedOfferLoadingStatus: null,
      selectedOfferComments: [],
      selectedOfferCommentsLoadingStatus: null,
    };

    const resultState = <OfferSlice>{
      selectedOffer: null,
      selectedOfferLoadingStatus: null,
      selectedOfferComments: [],
      selectedOfferCommentsLoadingStatus: null,
    };

    const action = {
      type: fetchCommentsOfferAction.pending.type,
    };

    expect(offerSlice.reducer(state, action)).toEqual(resultState);
  });

  it('should update selected offer', () => {
    const state = <OfferSlice>{
      selectedOffer: null,
      selectedOfferLoadingStatus: null,
      selectedOfferComments: [],
      selectedOfferCommentsLoadingStatus: null,
    };

    const resultState = <OfferSlice>{
      selectedOffer: OFFER,
      selectedOfferLoadingStatus: true,
      selectedOfferComments: [],
      selectedOfferCommentsLoadingStatus: null,
    };

    const action = {
      type: fetchOfferAction.fulfilled.type,
      payload: OFFER,
    };

    expect(offerSlice.reducer(state, action)).toEqual(resultState);
  });

  it('should update selected offer comments', () => {
    const state = <OfferSlice>{
      selectedOffer: null,
      selectedOfferLoadingStatus: null,
      selectedOfferComments: [],
      selectedOfferCommentsLoadingStatus: null,
    };

    const resultState = <OfferSlice>{
      selectedOffer: null,
      selectedOfferLoadingStatus: null,
      selectedOfferComments: COMMENTS,
      selectedOfferCommentsLoadingStatus: true,
    };

    const action = {
      type: fetchCommentsOfferAction.fulfilled.type,
      payload: COMMENTS,
    };

    expect(offerSlice.reducer(state, action)).toEqual(resultState);
  });
});
