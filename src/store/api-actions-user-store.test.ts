import { checkAuthAction, loginAction, logoutAction } from './api-actions';
import { configureStore, Dispatch, AnyAction, Middleware } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { saveToken, dropToken, getToken } from '../services/token';
import { createAPI } from '../services/api';
import { rootReducer } from './rootReducer';
import { APIRoute, NameSpace, AuthorizationStatus } from '../const';

describe('checkAuthAction', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  let store: ReturnType<typeof createTestStore>;
  const actionHistory: AnyAction[] = [];

  const actionCollector: Middleware = () => (next: Dispatch) => (action: AnyAction) => {
    actionHistory.push(action);
    return next(action);
  };


  const createTestStore = () =>
    configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: { extraArgument: axios },
        }).concat(actionCollector),
    });

  beforeEach(() => {
    store = createTestStore();
  });

  afterEach(() => {
    mockAxiosAdapter.reset();
    dropToken();
  });

  // checkAuthAction success
  it('should dispatch checkAuthAction success', async () => {
    // Сохраняем токен
    saveToken('test-token');
    // Мокаем запрос
    mockAxiosAdapter.onGet(APIRoute.Login).reply(200, {
      email: 'test-email',
      avatarUrl: 'test-avatar-url',
    });
    // Выполняем действие
    await store.dispatch(checkAuthAction());
    // Проверяем результат
    const fulfilledAction = actionHistory.find(
      (action) => action.type === checkAuthAction.fulfilled.type
    );
    expect(fulfilledAction).toBeDefined();
    expect(fulfilledAction?.payload).toEqual({
      email: 'test-email',
      avatarUrl: 'test-avatar-url',
    });
    expect(store.getState()[NameSpace.User].authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(store.getState()[NameSpace.User].userEmail).toBe('test-email');
    expect(store.getState()[NameSpace.User].userAvatar).toBe('test-avatar-url');
  });

  // checkAuthAction failure
  it('should dispatch checkAuthAction failure', async () => {
    // Сохраняем токен
    saveToken('test-token');
    // Мокаем запрос
    mockAxiosAdapter.onGet(APIRoute.Login).reply(401);
    // Выполняем действие
    await store.dispatch(checkAuthAction());
    // Проверяем результат
    const rejectedAction = actionHistory.find(
      (action) => action.type === checkAuthAction.rejected.type
    );
    expect(rejectedAction).toBeDefined();
    expect(store.getState()[NameSpace.User].authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(store.getState()[NameSpace.User].userEmail).toBe(null);
    expect(store.getState()[NameSpace.User].userAvatar).toBe(null);
  });

  // loginAction success
  it('should dispatch loginAction success', async () => {
    saveToken('test-token');
    // Мокаем запросЫ
    mockAxiosAdapter.onPost(APIRoute.Login).reply(200, {
      token: 'test-token',
    });
    mockAxiosAdapter.onGet(APIRoute.Login).reply(200, {
      email: 'test-email',
      avatarUrl: 'test-avatar-url',
    });
    // Выполняем действие
    await store.dispatch(loginAction({ login: 'test-email', password: 'test-password' }));
    // Проверяем результат
    const fulfilledAction = actionHistory.find(
      (action) => action.type === checkAuthAction.fulfilled.type
    );
    expect(fulfilledAction).toBeDefined();
    expect(fulfilledAction?.payload).toEqual({
      email: 'test-email',
      avatarUrl: 'test-avatar-url',
    });
    expect(getToken()).toBe('test-token');
    expect(store.getState()[NameSpace.User].authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(store.getState()[NameSpace.User].userEmail).toBe('test-email');
    expect(store.getState()[NameSpace.User].userAvatar).toBe('test-avatar-url');
  });

  // loginAction failure
  it('should dispatch loginAction failure', async () => {
    saveToken('test-token');
    // Мокаем запрос
    mockAxiosAdapter.onPost(APIRoute.Login).reply(401);
    // Выполняем действие
    await store.dispatch(loginAction({ login: 'test-email', password: 'test-password' }));
    // Проверяем результат
    const rejectedAction = actionHistory.find(
      (action) => action.type === checkAuthAction.rejected.type
    );
    expect(rejectedAction).toBeDefined();
    expect(store.getState()[NameSpace.User].authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(store.getState()[NameSpace.User].userEmail).toBe(null);
    expect(store.getState()[NameSpace.User].userAvatar).toBe(null);
  });

  // logoutAction success
  it('should dispatch logoutAction success', async () => {
    saveToken('test-token');
    // Мокаем запросЫ
    mockAxiosAdapter.onPost(APIRoute.Login).reply(200, {
      token: 'test-token',
    });
    mockAxiosAdapter.onGet(APIRoute.Login).reply(200, {
      email: 'test-email',
      avatarUrl: 'test-avatar-url',
    });
    await store.dispatch(loginAction({ login: 'test-email', password: 'test-password' }));
    // Mокаем запрос
    mockAxiosAdapter.onDelete(APIRoute.Logout).reply(200);
    // Выполняем действие
    await store.dispatch(logoutAction());
    // Проверяем результат
    const fulfilledAction = actionHistory.find(
      (action) => action.type === logoutAction.fulfilled.type
    );
    expect(fulfilledAction).toBeDefined();
    expect(store.getState()[NameSpace.User].authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(store.getState()[NameSpace.User].userEmail).toBe(null);
    expect(store.getState()[NameSpace.User].userAvatar).toBe(null);
  });

  // logoutAction failure
  it('should dispatch logoutAction failure', async () => {
    saveToken('test-token');
    // Мокаем запросЫ
    mockAxiosAdapter.onPost(APIRoute.Login).reply(200, {
      token: 'test-token',
    });
    mockAxiosAdapter.onGet(APIRoute.Login).reply(200, {
      email: 'test-email',
      avatarUrl: 'test-avatar-url',
    });
    await store.dispatch(loginAction({ login: 'test-email', password: 'test-password' }));
    // Mокаем запрос
    mockAxiosAdapter.onDelete(APIRoute.Logout).reply(401);
    // Выполняем действие
    await store.dispatch(logoutAction());
    // Проверяем результат
    const rejectedAction = actionHistory.find(
      (action) => action.type === logoutAction.rejected.type
    );
    expect(rejectedAction).toBeDefined();
    expect(store.getState()[NameSpace.User].authorizationStatus).toBe(AuthorizationStatus.Auth);
  });
});
