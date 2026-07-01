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

  afterEach(() => {
    mockAxiosAdapter.reset();
    store.clearActions();
  });

  describe('fetchCommentsOfferAction', () => {
    it('should dispatch pending and fulfilled on success', async () => {
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

    it('should dispatch pending and rejected on failure', async () => {
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
  });

  describe('postCommentsOfferAction', () => {
    it('should dispatch all actions in correct order on success', async () => {
      mockAxiosAdapter
        .onPost(`${APIRoute.Comments}/${OFFER.id}`)
        .reply(200);
      mockAxiosAdapter
        .onGet(`${APIRoute.Comments}/${OFFER.id}`)
        .reply(200, COMMENTS);

      await store.dispatch(
        postCommentsOfferAction({ offerId: OFFER.id, comment: 'test comment', rating: 5 })
      );

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postCommentsOfferAction.pending.type,
        fetchCommentsOfferAction.pending.type,
        fetchCommentsOfferAction.fulfilled.type,
        postCommentsOfferAction.fulfilled.type,
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

    it('should dispatch pending and rejected on POST failure', async () => {
      mockAxiosAdapter
        .onPost(`${APIRoute.Comments}/${OFFER.id}`)
        .reply(400);

      await store.dispatch(
        postCommentsOfferAction({ offerId: OFFER.id, comment: 'test comment', rating: 5 })
      );

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postCommentsOfferAction.pending.type,
        postCommentsOfferAction.rejected.type,
      ]);

      const postRequests = mockAxiosAdapter.history.post.filter(
        (req) => req.url === `${APIRoute.Comments}/${OFFER.id}`
      );
      expect(postRequests).toHaveLength(1);

      const getRequests = mockAxiosAdapter.history.get.filter(
        (req) => req.url === `${APIRoute.Comments}/${OFFER.id}`
      );
      expect(getRequests).toHaveLength(0);
    });
  });
});
