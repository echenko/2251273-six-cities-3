import { NameSpace } from '../../const';
import { getSelectedSorting } from './sorting-slice';
import { DEFAULT_SORTING } from '../../const';

describe('get selected sorting', () => {
  it('should return selected sorting', () => {
    const state = {
      [NameSpace.Sorting]: {
        selectedSorting: DEFAULT_SORTING,
      },
    };

    const result = getSelectedSorting(state);

    expect(result).toBe(DEFAULT_SORTING);
  });
});

describe('get selected sorting', () => {
  it('should return default sorting', () => {
    const state = {
      [NameSpace.Sorting]: {
        selectedSorting: '',
      },
    };

    const result = getSelectedSorting(state);

    expect(result).toBe('');
  });
});
