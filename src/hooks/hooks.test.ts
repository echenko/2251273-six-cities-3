import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { useAppDispatch, useAppSelector } from './hooks';
import type { State } from '../types/state';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

describe('Typed Redux Hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useAppDispatch', () => {
    it('должен возвращать функцию dispatch из react-redux', () => {
      const mockDispatch = vi.fn();
      vi.mocked(reactRedux.useDispatch).mockReturnValue(mockDispatch);

      const { result } = renderHook(() => useAppDispatch());

      expect(reactRedux.useDispatch).toHaveBeenCalledTimes(1);
      expect(result.current).toBe(mockDispatch);
    });
  });

  describe('useAppSelector', () => {
    it('должен возвращать выбранное состояние через useSelector', () => {
      vi.mocked(reactRedux.useSelector).mockReturnValue('John Doe');

      const selector = vi.fn<[State], string>().mockReturnValue('John Doe');
      const { result } = renderHook(() => useAppSelector(selector));

      expect(reactRedux.useSelector).toHaveBeenCalledTimes(1);
      expect(result.current).toBe('John Doe');
    });
  });
});
