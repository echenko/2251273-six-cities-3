import { fetchOffersAction, fetchNearOffersAction, fetchFavoriteOffersAction} from '../api-actions';
import { updateFavoriteOffers } from '../action';
import { offersSlice } from './offers-slice';
import { OffersSlice } from '../../types/slice/offers-slice';
import { OFFERS } from '../../mocks/mock-offers';

describe('Reducer: offersSlice', () => {
  it('should return initial state', () => {
    const state = offersSlice.getInitialState();

    expect(state).toEqual({
      offers: [],
      offersLoadingStatus: null,
      nearOffers: [],
      nearOffersLoadingStatus: null,
      favoriteOffers: [],
      favoriteOffersLoadingStatus: null,
    });
  });

  it('should return initial state / unknown action', () => {
    const result = offersSlice.reducer(
      undefined,
      {
        type: 'unknown action',
      });

    expect(result).toEqual({
      offers: [],
      offersLoadingStatus: null,
      nearOffers: [],
      nearOffersLoadingStatus: null,
      favoriteOffers: [],
      favoriteOffersLoadingStatus: null,
    });
  });

  it('should update offers', () => {
    const state = <OffersSlice>{
      offers: [],
      offersLoadingStatus: null,
      nearOffers: [],
      nearOffersLoadingStatus: null,
      favoriteOffers: [],
      favoriteOffersLoadingStatus: null,
    };

    const resultState = <OffersSlice>{
      offers: OFFERS,
      offersLoadingStatus: true,
      nearOffers: [],
      nearOffersLoadingStatus: null,
      favoriteOffers: [],
      favoriteOffersLoadingStatus: null,
    };

    const action = {
      type: fetchOffersAction.fulfilled.type,
      payload: OFFERS,
    };

    expect(offersSlice.reducer(state, action)).toEqual(resultState);
  });

  it('should update near offers', () => {
    const state = <OffersSlice>{
      offers: [],
      offersLoadingStatus: null,
      nearOffers: [],
      nearOffersLoadingStatus: null,
      favoriteOffers: [],
      favoriteOffersLoadingStatus: null,
    };

    const resultState = <OffersSlice>{
      offers: [],
      offersLoadingStatus: null,
      nearOffers: OFFERS.slice(0, 5),
      nearOffersLoadingStatus: true,
      favoriteOffers: [],
      favoriteOffersLoadingStatus: null,
    };

    const action = {
      type: fetchNearOffersAction.fulfilled.type,
      payload: OFFERS.slice(0, 5),
    };

    expect(offersSlice.reducer(state, action)).toEqual(resultState);
  });

  it('should update favorite offers', () => {
    const state = <OffersSlice>{
      offers: [],
      offersLoadingStatus: null,
      nearOffers: [],
      nearOffersLoadingStatus: null,
      favoriteOffers: [],
      favoriteOffersLoadingStatus: null,
    };

    const resultState = <OffersSlice>{
      offers: [],
      offersLoadingStatus: null,
      nearOffers: [],
      nearOffersLoadingStatus: null,
      favoriteOffers: OFFERS.slice(0, 3),
      favoriteOffersLoadingStatus: true,
    };

    const action = {
      type: fetchFavoriteOffersAction.fulfilled.type,
      payload: OFFERS.slice(0, 3),
    };

    expect(offersSlice.reducer(state, action)).toEqual(resultState);
  });

  it('should update offers loading status', () => {
    const state = <OffersSlice>{
      offers: [],
      offersLoadingStatus: null,
      nearOffers: [],
      nearOffersLoadingStatus: null,
      favoriteOffers: [],
      favoriteOffersLoadingStatus: null,
    };

    const resultState = <OffersSlice>{
      offers: [],
      offersLoadingStatus: false,
      nearOffers: [],
      nearOffersLoadingStatus: null,
      favoriteOffers: [],
      favoriteOffersLoadingStatus: null,
    };

    const action = {
      type: fetchOffersAction.rejected.type,
    };

    expect(offersSlice.reducer(state, action)).toEqual(resultState);
  });

  it('should update near offers loading status', () => {
    const state = <OffersSlice>{
      offers: [],
      offersLoadingStatus: null,
      nearOffers: [],
      nearOffersLoadingStatus: null,
      favoriteOffers: [],
      favoriteOffersLoadingStatus: null,
    };

    const resultState = <OffersSlice>{
      offers: [],
      offersLoadingStatus: null,
      nearOffers: [],
      nearOffersLoadingStatus: false,
      favoriteOffers: [],
      favoriteOffersLoadingStatus: null,
    };

    const action = {
      type: fetchNearOffersAction.rejected.type,
    };

    expect(offersSlice.reducer(state, action)).toEqual(resultState);
  });

  it('should update favorite offers loading status', () => {
    const state = <OffersSlice>{
      offers: [],
      offersLoadingStatus: null,
      nearOffers: [],
      nearOffersLoadingStatus: null,
      favoriteOffers: [],
      favoriteOffersLoadingStatus: null,
    };

    const resultState = <OffersSlice>{
      offers: [],
      offersLoadingStatus: null,
      nearOffers: [],
      nearOffersLoadingStatus: null,
      favoriteOffers: [],
      favoriteOffersLoadingStatus: false,
    };

    const action = {
      type: fetchFavoriteOffersAction.rejected.type,
    };

    expect(offersSlice.reducer(state, action)).toEqual(resultState);
  });

  it('should update favorite offers', () => {
    const state = <OffersSlice>{
      offers: OFFERS,
      offersLoadingStatus: null,
      nearOffers: [],
      nearOffersLoadingStatus: null,
      favoriteOffers: OFFERS.slice(0, 3),
      favoriteOffersLoadingStatus: null,
    };

    const resultState = <OffersSlice>{
      offers: OFFERS,
      offersLoadingStatus: null,
      nearOffers: [],
      nearOffersLoadingStatus: null,
      favoriteOffers: OFFERS.slice(0, 3),
      favoriteOffersLoadingStatus: null,
    };

    const action = {
      type: updateFavoriteOffers.type,
      payload: OFFERS,
    };

    expect(offersSlice.reducer(state, action)).toEqual(resultState);
  });
});
