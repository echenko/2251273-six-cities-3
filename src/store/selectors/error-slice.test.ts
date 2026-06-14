import { NameSpace } from '../../const';
import { getErrorType, checkErrorEmptyOffers } from './error-slice';
import { TYPE_OF_ERROR } from '../../const';

describe('get error type', () => {
  it('should return error type', () => {
    const state = {
      [NameSpace.Error]: {
        errorType: TYPE_OF_ERROR.ERROR_EMPTY_OFFERS,
      },
    };

    const result = getErrorType(state);

    expect(result).toBe(TYPE_OF_ERROR.ERROR_EMPTY_OFFERS);
  });

  it('should return null', () => {
    const state = {
      [NameSpace.Error]: {
        errorType: null,
      },
    };

    const result = getErrorType(state);

    expect(result).toBe(null);
  });

  it('should return true', () => {
    const state = {
      [NameSpace.Error]: {
        errorType: TYPE_OF_ERROR.ERROR_EMPTY_OFFERS,
      },
      [NameSpace.Offers]: {
        offers: [],
        offersLoadingStatus: true,
        nearOffers: [],
        nearOffersLoadingStatus: true,
        favoriteOffers: [],
        favoriteOffersLoadingStatus: true,
      },
    };

    const result = checkErrorEmptyOffers(state);

    expect(result).toBe(true);
  });

  it('should return false', () => {
    const state = {
      [NameSpace.Error]: {
        errorType: null,
      },
      [NameSpace.Offers]: {
        offers: [],
        offersLoadingStatus: true,
        nearOffers: [],
        nearOffersLoadingStatus: true,
        favoriteOffers: [],
        favoriteOffersLoadingStatus: true,
      },
    };

    const result = checkErrorEmptyOffers(state);

    expect(result).toBe(false);
  });

  it('should return false', () => {
    const state = {
      [NameSpace.Error]: {
        errorType: null,
      },
      [NameSpace.Offers]: {
        offers: [],
        offersLoadingStatus: null,
        nearOffers: [],
        nearOffersLoadingStatus: false,
        favoriteOffers: [],
        favoriteOffersLoadingStatus: false,
      },
    };

    const result = checkErrorEmptyOffers(state);

    expect(result).toBe(false);
  });
});
