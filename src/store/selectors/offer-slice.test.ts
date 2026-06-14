import { NameSpace } from '../../const';
import { getSelectedOffer, getSelectedOfferLoadingStatus, getSelectedOfferComments, getSelectedOfferCommentsLoadingStatus } from './offer-slice';
import { selectedOfferMock, selectedOfferCommentsMock } from './offer-slice-mock';

describe('get selected offer', () => {
  const state = {
    [NameSpace.Offer]: {
      selectedOffer: null,
      selectedOfferLoadingStatus: null,
      selectedOfferComments: [],
      selectedOfferCommentsLoadingStatus: null,
    },
  };

  it('should return selected offer', () => {
    const result = getSelectedOffer(state);

    expect(result).toBe(null);
  });

  it('should return selected offer loading status', () => {
    const result = getSelectedOfferLoadingStatus(state);

    expect(result).toBe(null);
  });

  it('should return selected offer comments', () => {
    const result = getSelectedOfferComments(state);

    expect(result).toEqual([]);
  });

  it('should return selected offer comments loading status', () => {
    const result = getSelectedOfferCommentsLoadingStatus(state);

    expect(result).toBe(null);
  });
});


describe('get selected offer', () => {
  const state = {
    [NameSpace.Offer]: {
      selectedOffer: selectedOfferMock,
      selectedOfferLoadingStatus: true,
      selectedOfferComments: [],
      selectedOfferCommentsLoadingStatus: false,
    },
  };

  it('should return selected offer', () => {
    const result = getSelectedOffer(state);

    expect(result).toBe(selectedOfferMock);
  });

  it('should return selected offer loading status', () => {
    const result = getSelectedOfferLoadingStatus(state);

    expect(result).toBe(true);
  });

  it('should return selected offer comments', () => {
    const result = getSelectedOfferComments(state);

    expect(result).toEqual([]);
  });

  it('should return selected offer comments loading status', () => {
    const result = getSelectedOfferCommentsLoadingStatus(state);

    expect(result).toBe(false);
  });
});


describe('get selected offer', () => {
  const state = {
    [NameSpace.Offer]: {
      selectedOffer: selectedOfferMock,
      selectedOfferLoadingStatus: true,
      selectedOfferComments: selectedOfferCommentsMock,
      selectedOfferCommentsLoadingStatus: true,
    },
  };

  it('should return selected offer', () => {
    const result = getSelectedOffer(state);

    expect(result).toBe(selectedOfferMock);
  });

  it('should return selected offer loading status', () => {
    const result = getSelectedOfferLoadingStatus(state);

    expect(result).toBe(true);
  });

  it('should return selected offer comments', () => {
    const result = getSelectedOfferComments(state);

    expect(result).toEqual(selectedOfferCommentsMock);
  });

  it('should return selected offer comments loading status', () => {
    const result = getSelectedOfferCommentsLoadingStatus(state);

    expect(result).toBe(true);
  });
});
