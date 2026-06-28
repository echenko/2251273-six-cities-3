import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTestStoreWithHistory } from './test-utils';
import { createAPI } from '../services/api';
import type { Reducer } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { ThunkAction } from '@reduxjs/toolkit';

type UnknownAction = {
  type: string;
};

vi.mock('../services/api', () => ({
  createAPI: vi.fn(() => ({ isDefaultMock: true })),
}));

vi.mock('../store/rootReducer', () => {
  interface MockState {
    counter: number;
  }

  const rootReducer: Reducer<MockState, UnknownAction> = (
    state = { counter: 0 },
    action
  ) => {
    if (action.type === 'INCREMENT') {
      return { counter: state.counter + 1 };
    }
    return state;
  };

  return { rootReducer };
});

describe('createTestStoreWithHistory', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return store, empty actionHistory, and default axiosInstance', () => {
    const result = createTestStoreWithHistory();

    expect(result).toHaveProperty('store');
    expect(result).toHaveProperty('actionHistory');
    expect(result).toHaveProperty('axiosInstance');

    expect(result.actionHistory).toEqual([]);
    expect(createAPI).toHaveBeenCalled();
    expect(result.axiosInstance).toEqual({ isDefaultMock: true });
  });

  it('should use provided custom axios instance instead of default', () => {
    const customAxios = { isCustom: true, get: vi.fn() };
    const { axiosInstance } = createTestStoreWithHistory(
      customAxios as unknown as AxiosInstance
    );

    expect(createAPI).not.toHaveBeenCalled();
    expect(axiosInstance).toBe(customAxios);
  });

  it('should collect all dispatched actions in actionHistory', () => {
    const { store, actionHistory } = createTestStoreWithHistory();

    const action1 = { type: 'USER_LOGIN' };
    const action2 = { type: 'FETCH_DATA' };

    store.dispatch(action1);
    store.dispatch(action2);

    expect(actionHistory).toHaveLength(2);
    expect(actionHistory[0]).toEqual(action1);
    expect(actionHistory[1]).toEqual(action2);
  });

  it('should pass axiosInstance as extraArgument to thunks', () => {
    const customAxios = { isCustom: true } as unknown as AxiosInstance;
    const { store, axiosInstance } = createTestStoreWithHistory(customAxios);

    let receivedExtra: AxiosInstance | null = null;

    type RootState = ReturnType<typeof store.getState>;
    type AppThunk<ReturnType = void> = ThunkAction<
      ReturnType,
      RootState,
      AxiosInstance,
      UnknownAction
    >;

    const thunkAction: AppThunk = (_dispatch, _getState, extra) => {
      receivedExtra = extra;
    };

    store.dispatch(thunkAction);

    expect(receivedExtra).toBe(axiosInstance);
    expect(receivedExtra).toBe(customAxios);
  });

  it('should correctly update state using the mocked rootReducer', () => {
    const { store } = createTestStoreWithHistory();

    expect(store.getState()).toEqual({ counter: 0 });

    store.dispatch({ type: 'INCREMENT' });

    expect(store.getState()).toEqual({ counter: 1 });
  });

  it('should include actions dispatched from inside thunks in actionHistory', () => {
    const { store, actionHistory } = createTestStoreWithHistory();

    actionHistory.length = 0;

    const innerAction = { type: 'THUNK_INNER_ACTION' };

    type RootState = ReturnType<typeof store.getState>;
    type AppThunk = ThunkAction<void, RootState, AxiosInstance, UnknownAction>;

    const thunkAction: AppThunk = (dispatch) => {
      dispatch(innerAction);
    };

    store.dispatch(thunkAction);

    expect(actionHistory.length).toBeGreaterThan(0);
    expect(actionHistory).toContainEqual(innerAction);
  });
});
