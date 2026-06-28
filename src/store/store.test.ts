import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type {
  ThunkAction,
  Reducer,
  Middleware,
} from '@reduxjs/toolkit';

type UnknownAction = {
  type: string;
  payload?: unknown;
};

vi.mock('../services/api', () => ({
  createAPI: vi.fn(() => ({
    isMockedAPI: true,
    get: vi.fn(),
    post: vi.fn(),
  })),
}));

vi.mock('./rootReducer', () => {
  interface MockState {
    test: string;
  }

  const rootReducer: Reducer<MockState, UnknownAction> = (
    state = { test: 'initial' },
    action
  ) => {
    if (action.type === 'TEST_ACTION') {
      return { test: 'updated' };
    }
    return state;
  };

  return { rootReducer };
});

import { createAPI } from '../services/api';
import { rootReducer } from './rootReducer';

describe('store configuration', () => {
  const createTestStore = () => {
    const api = createAPI();
    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: api,
          },
        }),
    });
    return { store, api };
  };

  type RootState = ReturnType<ReturnType<typeof createTestStore>['store']['getState']>;
  type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    AxiosInstance,
    UnknownAction
  >;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initialization', () => {
    it('should create store with correct initial state', () => {
      const { store } = createTestStore();

      expect(store).toBeDefined();
      expect(typeof store.getState).toBe('function');
      expect(typeof store.dispatch).toBe('function');
      expect(typeof store.subscribe).toBe('function');
      expect(store.getState()).toEqual({ test: 'initial' });
    });

    it('should create api instance via createAPI', () => {
      const { api } = createTestStore();

      expect(api).toBeDefined();
      expect(api).toHaveProperty('isMockedAPI', true);
      expect(createAPI).toHaveBeenCalled();
    });

    it('should create api instance only once per store', () => {
      vi.clearAllMocks();
      createTestStore();

      expect(createAPI).toHaveBeenCalledTimes(1);
    });
  });

  describe('reducer integration', () => {
    it('should update state via dispatched actions', () => {
      const { store } = createTestStore();

      expect(store.getState()).toEqual({ test: 'initial' });

      store.dispatch({ type: 'TEST_ACTION' });

      expect(store.getState()).toEqual({ test: 'updated' });
    });

    it('should ignore unknown actions', () => {
      const { store } = createTestStore();

      store.dispatch({ type: 'UNKNOWN_ACTION' });

      expect(store.getState()).toEqual({ test: 'initial' });
    });
  });

  describe('thunk middleware', () => {
    it('should execute synchronous thunks and dispatch inner actions', () => {
      const { store } = createTestStore();

      expect(store.getState()).toEqual({ test: 'initial' });

      const thunkAction: AppThunk = (dispatch) => {
        dispatch({ type: 'TEST_ACTION' });
      };

      store.dispatch(thunkAction);

      expect(store.getState()).toEqual({ test: 'updated' });
    });

    it('should pass api as extraArgument to thunks', () => {
      const { store, api } = createTestStore();

      let receivedExtra: AxiosInstance | null = null;

      const thunkAction: AppThunk = (_dispatch, _getState, extra) => {
        receivedExtra = extra;
      };

      store.dispatch(thunkAction);

      expect(receivedExtra).toBe(api);
      expect(receivedExtra).toHaveProperty('isMockedAPI', true);
    });

    it('should execute async thunks and allow api usage', async () => {
      const { store, api } = createTestStore();
      const mockGet = vi.mocked(api.get);
      mockGet.mockResolvedValue({ data: 'test response' });

      const asyncThunk: AppThunk<Promise<string>> = async (
        _dispatch,
        _getState,
        extra
      ) => {
        const response = await extra.get<string>('/api/test');
        return response.data;
      };

      const result = await store.dispatch(asyncThunk);

      expect(mockGet).toHaveBeenCalledWith('/api/test');
      expect(result).toBe('test response');
    });

    it('should allow thunks to access current state via getState', () => {
      const { store } = createTestStore();

      let capturedState: RootState | null = null;

      const thunkAction: AppThunk = (_dispatch, getState) => {
        capturedState = getState();
      };

      store.dispatch(thunkAction);

      expect(capturedState).toEqual({ test: 'initial' });
    });

    it('should track all dispatched actions including from thunks', () => {
      const api = createAPI();
      const actionLog: UnknownAction[] = [];

      const loggingMiddleware: Middleware<object, RootState> =
        () => (next) => (action) => {
          actionLog.push(action as UnknownAction);
          return next(action) as unknown;
        };

      const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            thunk: { extraArgument: api },
          }).concat(loggingMiddleware),
      });

      const innerAction = { type: 'THUNK_DISPATCHED' };
      const thunkAction: AppThunk = (dispatch) => {
        dispatch(innerAction);
      };

      store.dispatch(thunkAction);

      expect(actionLog).toHaveLength(1);
      expect(actionLog[0]).toEqual(innerAction);
    });
  });

  describe('real-world scenario', () => {
    it('should handle typical async data fetching flow', async () => {
      const { store, api } = createTestStore();
      const mockGet = vi.mocked(api.get);
      mockGet.mockResolvedValue({ data: { id: 1, name: 'Test' } });

      type FetchedData = { id: number; name: string };
      let fetchedData: FetchedData | null = null;

      const fetchDataThunk: AppThunk<Promise<void>> = async (
        dispatch,
        _getState,
        extra
      ) => {
        dispatch({ type: 'FETCH_START' });
        try {
          const response = await extra.get<FetchedData>('/api/data');
          fetchedData = response.data;
          dispatch({ type: 'FETCH_SUCCESS' });
        } catch {
          dispatch({ type: 'FETCH_ERROR' });
        }
      };

      await store.dispatch(fetchDataThunk);

      expect(mockGet).toHaveBeenCalledWith('/api/data');
      expect(fetchedData).toEqual({ id: 1, name: 'Test' });
    });

    it('should handle api errors in thunks', async () => {
      const { store, api } = createTestStore();
      const mockGet = vi.mocked(api.get);
      mockGet.mockRejectedValue(new Error('Network error'));

      let errorCaught = false;

      const failingThunk: AppThunk<Promise<void>> = async (
        dispatch,
        _getState,
        extra
      ) => {
        try {
          await extra.get('/api/fail');
        } catch {
          errorCaught = true;
          dispatch({ type: 'FETCH_ERROR' });
        }
      };

      await store.dispatch(failingThunk);

      expect(errorCaught).toBe(true);
      expect(store.getState()).toEqual({ test: 'initial' });
    });
  });
});
