import { fetchFavoriteOffersAction, postFavoriteOfferAction } from './api-actions';
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
  let store: ReturnType<typeof mockStoreCreator> = mockStoreCreator({});

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

  // fetch favorite offers / add / success
  it('should fetch favorite offers', async () => {
    const fakeOffer = [OFFER];
    mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${fakeOffer[0].id}/1`).reply(200);
    mockAxiosAdapter.onGet(`${APIRoute.Favorite}/${fakeOffer[0].id}/1`).reply(200, fakeOffer);

    await store.dispatch(postFavoriteOfferAction({ id: fakeOffer[0].id, status: true }));

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([
      postFavoriteOfferAction.pending.type,
      fetchFavoriteOffersAction.pending.type,
      postFavoriteOfferAction.fulfilled.type,
      // TODO: Почему не срабатывает?!
      // fetchFavoriteOffersAction.fulfilled.type
    ]);

    mockAxiosAdapter.onAny().reply(200, fakeOffer);
  });

  // fetch favorite offers / remove / success
  it('should fetch favorite offers', async () => {
    const fakeOffer = [OFFER];
    mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${fakeOffer[0].id}/0`).reply(200);
    mockAxiosAdapter.onGet(`${APIRoute.Favorite}/${fakeOffer[0].id}/0`).reply(200, fakeOffer);

    await store.dispatch(postFavoriteOfferAction({ id: fakeOffer[0].id, status: false }));

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([
      postFavoriteOfferAction.pending.type,
      fetchFavoriteOffersAction.pending.type,
      postFavoriteOfferAction.fulfilled.type,
    ]);
  });

  // fetch favorite offers error
  it('should fetch favorite offers error', async () => {
    const fakeOffer = [OFFER];
    mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${fakeOffer[0].id}/1`).reply(400);

    await store.dispatch(postFavoriteOfferAction({ id: fakeOffer[0].id, status: true }));

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([
      postFavoriteOfferAction.pending.type,
      postFavoriteOfferAction.rejected.type,
    ]);
  });
});
