import { NameSpace } from '../../const';
import { getSelectedCity } from './city-slice';

describe('get selected city', () => {
  it('should return selected city', () => {
    const state = {
      [NameSpace.City]: {
        selectedCity: 'Amsterdam',
      },
    };

    const result = getSelectedCity(state);

    expect(result).toBe('Amsterdam');
  });
}
);
