import { fetchOfferAction } from '../store/api-actions';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { OFFER } from '../mocks/mock-offer';

type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

describe('Async actions: offers', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator> = mockStoreCreator({
    OFFER: {
      selectedOffer: null,
      selectedOfferLoadingStatus: null,
      selectedOfferComments: [],
      selectedOfferCommentsLoadingStatus: null,
    },
  });

  // reset store
  beforeEach(() => {
    store = mockStoreCreator({
      OFFER: {
        selectedOffer: null,
        selectedOfferLoadingStatus: null,
        selectedOfferComments: [],
        selectedOfferCommentsLoadingStatus: null,
      },
    });
  });

  // reset mocks
  afterEach(() => {
    mockAxiosAdapter.reset();
    store.clearActions();
  });

  // fetchOffer action success
  it('should fetch offer', async () => {
    mockAxiosAdapter
      .onGet(`${APIRoute.Offer}/id`)
      .reply(200, OFFER);

    await store.dispatch(fetchOfferAction('id'));

    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      fetchOfferAction.pending.type,
      fetchOfferAction.fulfilled.type
    ]);
  });

  // fetchOffer action error
  it('should fetch offer error', async () => {
    mockAxiosAdapter
      .onGet(`${APIRoute.Offer}/id`)
      .reply(400);

    await store.dispatch(fetchOfferAction('id'));

    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      fetchOfferAction.pending.type,
      fetchOfferAction.rejected.type
    ]);
  });
});
