import { checkAuthAction, fetchOffersAction } from './api-actions';
import { AuthorizationStatus, APIRoute } from '../const';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { OFFERS } from './slices/offers-slice-mock';

type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      USER: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userEmail: null,
        userAvatar: null,
      },
      OFFERS: {
        offers: [],
        offersLoadingStatus: null,
        nearOffers: [],
        nearOffersLoadingStatus: null,
        favoriteOffers: [],
        favoriteOffersLoadingStatus: null,
      },
    });
  });

  describe(' action', () => {
    it('should checkAuthAction be fulfilled with 200', async () => {

      mockAxiosAdapter
        .onGet(APIRoute.Login)
        .reply(200, { email: 'oBtXg@example.com', avatarUrl: 'https://via.placeholder.com/150' }, { 'x-token': 'token' });

      await store.dispatch(checkAuthAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should checkAuthAction be rejected with 400', async () => {

      mockAxiosAdapter
        .onGet(APIRoute.Login)
        .reply(400);

      await store.dispatch(checkAuthAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });

    it('should checkAuthAction be rejected with 500', async () => {

      mockAxiosAdapter
        .onGet(APIRoute.Login)
        .reply(500);

      await store.dispatch(checkAuthAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });

    it('should checkAuthAction be fulfilled with 200', async () => {
      const mockOffers = OFFERS;
      mockAxiosAdapter
        .onGet(APIRoute.Offers)
        .reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());


      const emittedActions = store.getActions();
      const actions = extractActionsTypes(store.getActions());
      const fetchQuestionsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;


      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchQuestionsActionFulfilled.payload).toEqual(mockOffers);
    });

  });
});
