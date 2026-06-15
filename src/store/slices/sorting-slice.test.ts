import { changeSorting } from '../action';
import { DEFAULT_SORTING } from '../../const';
import { sortingSlice } from './sorting-slice';

describe('sorting slice', () => {
  it('should return initial state / DEFAULT_SORTING', () => {
    const state = sortingSlice.getInitialState();

    expect(state).toEqual({
      selectedSorting: DEFAULT_SORTING,
    });
  });

  it('should update sorting / Popular', () => {
    const result = sortingSlice.reducer({ selectedSorting: DEFAULT_SORTING }, changeSorting('Popular'));

    expect(result).toEqual({
      selectedSorting: 'Popular',
    });
  });

  it('should update sorting / DEFAULT_SORTING', () => {
    const result = sortingSlice.reducer({ selectedSorting: 'Popular' }, changeSorting(DEFAULT_SORTING));

    expect(result).toEqual({
      selectedSorting: DEFAULT_SORTING,
    });
  });

  it('should return initial state / unknown action', () => {
    const result = sortingSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION',
    });

    expect(result).toEqual({
      selectedSorting: DEFAULT_SORTING,
    });
  });
});
