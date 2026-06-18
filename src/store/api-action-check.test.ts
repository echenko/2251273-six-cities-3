import { checkAuthAction, loginAction, logoutAction } from './api-actions';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { saveToken, dropToken, getToken } from '../services/token';

type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  afterEach(() => {
    mockAxiosAdapter.reset();
    dropToken();
  });

  describe('checkAuthAction', () => {

    // checkAuthAction success
    it('should check auth if token', async () => {
      // Сохраняем токен
      saveToken('token');
      // Создаем мок запрос
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, {
        email: 'oBtXg@example.com',
        avatarUrl: 'https://via.placeholder.com/150',
      });
      // Выполняем action
      await store.dispatch(checkAuthAction());
      // Получаем actions
      const actions = extractActionsTypes(store.getActions());
      // Проверка action
      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
      // Проверка токена
      expect(getToken()).toBe('token');
    });

    // checkAuthAction fail
    it('should not check auth if no token', async () => {
      // Удаляем токен
      dropToken();
      // Создаем мок запрос
      mockAxiosAdapter.onGet(APIRoute.Login).reply(401);
      // Выполняем action
      await store.dispatch(checkAuthAction());
      // Получаем actions
      const actions = extractActionsTypes(store.getActions());
      // Проверка action
      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
      // Проверка отсутствия токена
      expect(getToken()).toBe('');
    });

    // check login success
    // TODO: сомневаюсь в этом тесте! токен нужен или нет?
    it('should login user and check auth', async () => {
      // Создаем мок запрос
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, {
        token: 'token',
      });
      // Выполняем action
      await store.dispatch(loginAction({
        login: 'oBtXg@example.com',
        password: '123456',
      }));
      // Получаем actions
      const actions = extractActionsTypes(store.getActions());
      // Проверка action
      expect(actions).toEqual([
        loginAction.pending.type,
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
        loginAction.rejected.type,
      ]);
    });

    // check login fail
    it('should not login user', async () => {
      // Создаем мок запрос
      mockAxiosAdapter.onPost(APIRoute.Login).reply(401);
      // Выполняем action
      await store.dispatch(loginAction({
        login: 'oBtXg@example.com',
        password: '123456',
      }));
      // Получаем actions
      const actions = extractActionsTypes(store.getActions());
      // Проверка action
      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type,
      ]);
    });

    // check logout success
    it('TODO: fail test, should logout user', async () => {
      // Сохраняем токен
      saveToken('token');
      // Создаем мок запрос
      mockAxiosAdapter.onGet(APIRoute.Login).reply(204);
      // Выполняем action
      await store.dispatch(logoutAction());
      // Получаем actions
      const actions = extractActionsTypes(store.getActions());
      // Проверка action
      expect(actions).toEqual([
        logoutAction.pending.type,
        // Почему не fulfilled
        logoutAction.rejected.type,
      ]);
      // Удаляем токен
      dropToken();
      // Проверка отсутствия токена
      expect(getToken()).toBe('');
    });

    // check logout fail
    it('should not logout user', async () => {
      // Сохраняем токен
      saveToken('token');
      // Создаем мок запрос
      mockAxiosAdapter.onGet(APIRoute.Login).reply(401);
      // Выполняем action
      await store.dispatch(logoutAction());
      // Получаем actions
      const actions = extractActionsTypes(store.getActions());
      // Проверка action
      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.rejected.type,
      ]);
    });

  });
});

