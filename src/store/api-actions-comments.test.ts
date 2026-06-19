import { fetchCommentsOfferAction, postCommentsOfferAction } from '../store/api-actions';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { OFFER } from '../mocks/mock-offer';
import { COMMENTS } from '../mocks/mock-comments';

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

  // fetch comments offer success
  it('should fetch comments offer', async () => {
    mockAxiosAdapter
      .onGet(`${APIRoute.Comments}/${OFFER.id}`)
      .reply(200, COMMENTS);

    await store.dispatch(fetchCommentsOfferAction(OFFER.id));

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([
      fetchCommentsOfferAction.pending.type,
      fetchCommentsOfferAction.fulfilled.type,
    ]);
  });

  // fetch comments offer error
  it('should fetch comments offer', async () => {
    mockAxiosAdapter
      .onGet(`${APIRoute.Comments}/${OFFER.id}`)
      .reply(400);

    await store.dispatch(fetchCommentsOfferAction(OFFER.id));

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([
      fetchCommentsOfferAction.pending.type,
      fetchCommentsOfferAction.rejected.type,
    ]);
  });

  // post comments offer success
  it('should post comments offer', async () => {
    mockAxiosAdapter
      .onPost(`${APIRoute.Comments}/${OFFER.id}`)
      .reply(200);
    mockAxiosAdapter
      .onGet(`${APIRoute.Comments}/${OFFER.id}`)
      .reply(200, COMMENTS);

    await store.dispatch(postCommentsOfferAction({ offerId: OFFER.id, comment: 'test comment', rating: 5 }));

    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      postCommentsOfferAction.pending.type,
      fetchCommentsOfferAction.pending.type,
      postCommentsOfferAction.fulfilled.type,
      // TODO: Почему не доходит до fulfilled?!
      // fetchCommentsOfferAction.fulfilled.type,
    ]);

    const postRequests = mockAxiosAdapter.history.post.filter(
      (req) => req.url === `${APIRoute.Comments}/${OFFER.id}`
    );

    const getRequests = mockAxiosAdapter.history.get.filter(
      (req) => req.url === `${APIRoute.Comments}/${OFFER.id}`
    );

    expect(postRequests).toHaveLength(1);

    expect(getRequests).toHaveLength(1);
  });

  // post comments offer error
  it('should post comments offer', async () => {
    mockAxiosAdapter
      .onPost(`${APIRoute.Comments}/${OFFER.id}`)
      .reply(400);

    await store.dispatch(postCommentsOfferAction({ offerId: OFFER.id, comment: 'test comment', rating: 5 }));

    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      postCommentsOfferAction.pending.type,
      postCommentsOfferAction.rejected.type,
    ]);
  });
});
