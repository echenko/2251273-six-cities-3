import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OfferPage } from './offer-page';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { useParams } from 'react-router-dom';
import { fetchOfferAction, fetchNearOffersAction } from '../store/api-actions';
import { setErrorType } from '../store/action';
import { TYPE_OF_ERROR } from '../const';
import { OffersElementType } from '../types/offers';
import { OfferType } from '../types/offer';
import { OFFER } from '../mocks/mock-offer';

// Мокируем зависимости
vi.mock('../hooks/hooks');
vi.mock('react-router-dom');
vi.mock('../store/api-actions');
vi.mock('../store/action');
vi.mock('../components/offer/offer-gallery', () => ({
  OfferGallery: vi.fn(() => <div data-testid="offer-gallery">Gallery</div>),
}));
vi.mock('../components/offer/offer', () => ({
  Offer: vi.fn(() => <div data-testid="offer">Offer</div>),
}));
vi.mock('../components/offer/offer-places', () => ({
  NearPlaces: vi.fn(() => <div data-testid="near-places">NearPlaces</div>),
}));
vi.mock('../components/map/map', () => ({
  Map: vi.fn(() => <div data-testid="map">Map</div>),
}));
vi.mock('../components/message/message', () => ({
  Message: vi.fn(() => <div data-testid="message">Message</div>),
}));
vi.mock('../utils', () => ({
  getLocation: vi.fn(() => ({ lat: 50, lng: 50 })),
  getRandomNearsOffers: vi.fn(() => []),
}));

describe('OfferPage', () => {
  const mockDispatch = vi.fn();
  const mockOfferId = '123';
  const mockSelectedOffer: OfferType = OFFER;
  const mockNearOffers: OffersElementType[] = [];

  beforeEach(() => {
    vi.clearAllMocks();

    // Настройка моков
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useParams).mockReturnValue({ offerId: mockOfferId });

    vi.mocked(useAppSelector).mockImplementation((selector) => {
      const selectorName = selector.name;
      if (selectorName === 'getSelectedOffer') {
        return mockSelectedOffer;
      }
      if (selectorName === 'getNearOffers') {
        return mockNearOffers;
      }
      if (selectorName === 'getSelectedOfferLoadingStatus') {
        return true;
      }
      return null;
    });
  });

  it('должен рендериться без ошибок', () => {
    render(<OfferPage />);

    expect(screen.getByTestId('offer-gallery')).toBeInTheDocument();
    expect(screen.getByTestId('offer')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('near-places')).toBeInTheDocument();
  });

  it('должен вызывать fetchOfferAction и fetchNearOffersAction при монтировании', () => {
    render(<OfferPage />);

    expect(mockDispatch).toHaveBeenCalledWith(fetchOfferAction(mockOfferId));
    expect(mockDispatch).toHaveBeenCalledWith(fetchNearOffersAction(mockOfferId));
  });

  it('должен показывать Message при ошибке загрузки', () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      const selectorName = selector.name;
      if (selectorName === 'getSelectedOfferLoadingStatus') {
        return false;
      }
      if (selectorName === 'getSelectedOffer') {
        return null;
      }
      return mockNearOffers;
    });

    render(<OfferPage />);

    expect(screen.getByTestId('message')).toBeInTheDocument();
    expect(mockDispatch).toHaveBeenCalledWith(
      setErrorType(TYPE_OF_ERROR.ERROR_LOADING_OFFER)
    );
  });

  it('не должен рендерить компоненты предложения, если selectedOffer отсутствует', () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      const selectorName = selector.name;
      if (selectorName === 'getSelectedOffer') {
        return null;
      }
      if (selectorName === 'getSelectedOfferLoadingStatus') {
        return true;
      }
      return mockNearOffers;
    });

    render(<OfferPage />);

    expect(screen.queryByTestId('offer-gallery')).not.toBeInTheDocument();
    expect(screen.queryByTestId('offer')).not.toBeInTheDocument();
  });
});
