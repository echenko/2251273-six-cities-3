import { setErrorType } from '../action';
import { errorSlice } from './error-slice';
import { TYPE_OF_ERROR } from '../../const';

describe('error slice', () => {
  it('should return initial state', () => {
    const state = errorSlice.getInitialState();

    expect(state).toEqual({
      errorType: null,
    });
  });

  it('should update error type / TYPE_OF_ERROR.ERROR_EMPTY_OFFERS', () => {
    const result = errorSlice.reducer({ errorType: null }, setErrorType(TYPE_OF_ERROR.ERROR_EMPTY_OFFERS));

    expect(result).toEqual({
      errorType: TYPE_OF_ERROR.ERROR_EMPTY_OFFERS,
    });
  });

  it('should update error type / null', () => {
    const result = errorSlice.reducer({ errorType: TYPE_OF_ERROR.ERROR_EMPTY_OFFERS }, setErrorType(null));

    expect(result).toEqual({
      errorType: null,
    });
  });

  it('should return initial state / unknown action', () => {
    const state = errorSlice.getInitialState();

    const result = errorSlice.reducer(state, { type: 'unknown' });

    expect(result).toEqual(state);
  });
});
