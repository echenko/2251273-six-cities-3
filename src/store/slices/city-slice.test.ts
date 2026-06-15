import { changeCity } from '../action';
import { citySlice } from './city-slice';
import { DEFAULT_CITY } from '../../const';

describe('city slice', () => {
  it('should return initial state', () => {
    const result = citySlice.getInitialState();

    expect(result).toEqual({
      selectedCity: DEFAULT_CITY,
    });
  });

  it('should update city', () => {
    const result = citySlice.reducer({ selectedCity: '' }, changeCity('Amsterdam'));

    expect(result).toEqual({
      selectedCity: 'Amsterdam',
    });
  });

  it('should update city', () => {
    const result = citySlice.reducer({ selectedCity: 'Amsterdam' }, changeCity(DEFAULT_CITY));

    expect(result).toEqual({
      selectedCity: DEFAULT_CITY,
    });
  });

  it('should update city', () => {
    const result = citySlice.reducer({ selectedCity: 'Paris' }, changeCity(''));

    expect(result).toEqual({
      selectedCity: '',
    });
  });

  it('should return initial state / unknown action', () => {
    const result = citySlice.reducer({ selectedCity: DEFAULT_CITY}, { type: 'unknown' });

    expect(result).toEqual({
      selectedCity: DEFAULT_CITY,
    });
  });
});
