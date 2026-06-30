import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTestStore } from './api-action-utils';
import { createAPI } from '../services/api';
import { Dispatch } from 'react';

interface UnknownAction {
  type: string;
}

vi.mock('../services/api', () => ({
  createAPI: vi.fn(() => ({
    get: vi.fn(),
    post: vi.fn(),
  })),
}));

describe('createTestStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('должен возвращать объект с store, actionHistory и axios', () => {
    const result = createTestStore();

    expect(result.store).toBeDefined();
    expect(result.actionHistory).toBeDefined();
    expect(result.axios).toBeDefined();
    expect(Array.isArray(result.actionHistory)).toBe(true);
  });

  it('должен вызывать createAPI', () => {
    createTestStore();

    expect(createAPI).toHaveBeenCalledTimes(1);
  });

  it('должен создавать store с начальным состоянием', () => {
    const { store } = createTestStore();
    const state = store.getState();

    expect(state).toBeDefined();
    expect(typeof state).toBe('object');
  });

  it('должен собирать действия в actionHistory', () => {
    const { store, actionHistory } = createTestStore();
    const initialLength = actionHistory.length;

    store.dispatch({ type: 'test/action1' });
    store.dispatch({ type: 'test/action2' });

    expect(actionHistory.length).toBe(initialLength + 2);
    expect(actionHistory[initialLength].type).toBe('test/action1');
    expect(actionHistory[initialLength + 1].type).toBe('test/action2');
  });

  it('должен добавлять кастомные middleware', () => {
    const middlewareCalls: string[] = [];

    const customMiddleware =
      () => (next: Dispatch<UnknownAction>) => (action: UnknownAction) => {
        middlewareCalls.push(String(action.type));
        return next(action);
      };

    const { store } = createTestStore([customMiddleware]);

    store.dispatch({ type: 'test/action' });

    expect(middlewareCalls).toContain('test/action');
  });

  it('должен создавать независимые store при каждом вызове', () => {
    const store1 = createTestStore();
    const store2 = createTestStore();

    store1.store.dispatch({ type: 'action1' });

    expect(store1.actionHistory.length).toBeGreaterThan(store2.actionHistory.length);
  });
});
