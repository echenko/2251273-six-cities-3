import { describe, it, expect } from 'vitest';
import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { OffersElementType } from '../../types/offers';
import {
  getOffers,
  getOffersLoadingStatus,
  getNearOffers,
  getNearOffersLoadingStatus,
  getFavoriteOffers,
  getFavoriteOffersLoadingStatus,
} from './offers-slice';

describe('Offers Selectors', () => {
  const mockOffers = [{ id: '1', title: 'Offer 1' }] as OffersElementType[];
  const mockNearOffers = [{ id: '2', title: 'Near Offer 1' }] as OffersElementType[];
  const mockFavoriteOffers = [{ id: '3', title: 'Favorite Offer 1' }] as OffersElementType[];

  const mockState = {
    [NameSpace.Offers]: {
      offers: mockOffers,
      offersLoadingStatus: true,
      nearOffers: mockNearOffers,
      nearOffersLoadingStatus: false,
      favoriteOffers: mockFavoriteOffers,
      favoriteOffersLoadingStatus: null,
    },
  } as unknown as State;

  describe('getOffers', () => {
    it('should return offers array from state', () => {
      expect(getOffers(mockState)).toBe(mockOffers);
    });
  });

  describe('getOffersLoadingStatus', () => {
    it('should return offers loading status from state', () => {
      expect(getOffersLoadingStatus(mockState)).toBe(true);
    });
  });

  describe('getNearOffers', () => {
    it('should return near offers array from state', () => {
      expect(getNearOffers(mockState)).toBe(mockNearOffers);
    });
  });

  describe('getNearOffersLoadingStatus', () => {
    it('should return near offers loading status from state', () => {
      expect(getNearOffersLoadingStatus(mockState)).toBe(false);
    });
  });

  describe('getFavoriteOffers', () => {
    it('should return favorite offers array from state', () => {
      expect(getFavoriteOffers(mockState)).toBe(mockFavoriteOffers);
    });
  });

  describe('getFavoriteOffersLoadingStatus', () => {
    it('should return favorite offers loading status from state', () => {
      expect(getFavoriteOffersLoadingStatus(mockState)).toBeNull();
    });
  });
});
