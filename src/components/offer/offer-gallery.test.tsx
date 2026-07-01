import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OfferGallery } from './offer-gallery';
import { OfferImage } from './offer-image';
import { MAX_OFFER_IMAGES_COUNT } from '../../const';
import type { OfferType } from '../../types/offer';

vi.mock('./offer-image', () => ({
  OfferImage: vi.fn(({ imgSrc, imgAlt }: { imgSrc: string; imgAlt: string }) => (
    <div data-testid="mock-image" data-src={imgSrc} data-alt={imgAlt}>
      Mock Image
    </div>
  )),
}));

describe('Component: OfferGallery', () => {
  const mockOffer: OfferType = {
    id: '1',
    title: 'Beautiful Apartment',
    type: 'apartment',
    price: 120,
    city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 13 } },
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 13 },
    isFavorite: false,
    isPremium: false,
    rating: 4.5,
    description: 'A nice place',
    bedrooms: 2,
    goods: ['Wi-Fi', 'Kitchen'],
    host: { name: 'John', avatarUrl: '/avatar.jpg', isPro: false },
    images: [
      '/img/room.jpg',
      '/img/apartment-01.jpg',
      '/img/apartment-02.jpg',
      '/img/apartment-03.jpg',
      '/img/apartment-04.jpg',
      '/img/apartment-05.jpg',
      '/img/apartment-06.jpg',
    ],
    maxAdults: 4,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render gallery container with correct BEM classes', () => {
    render(<OfferGallery offer={mockOffer} />);

    expect(document.querySelector('.offer__gallery-container.container')).toBeInTheDocument();
    expect(document.querySelector('.offer__gallery')).toBeInTheDocument();
  });

  it('should render all images if count is less than or equal to MAX_OFFER_IMAGES_COUNT', () => {
    const offerWithFewImages = {
      ...mockOffer,
      images: ['/img/room.jpg', '/img/apartment-01.jpg'],
    };

    render(<OfferGallery offer={offerWithFewImages} />);

    const images = screen.getAllByTestId('mock-image');
    expect(images).toHaveLength(2);
  });

  it('should slice images to MAX_OFFER_IMAGES_COUNT if there are more images', () => {
    render(<OfferGallery offer={mockOffer} />);

    const images = screen.getAllByTestId('mock-image');
    expect(images).toHaveLength(MAX_OFFER_IMAGES_COUNT);
  });

  it('should pass correct imgSrc and imgAlt props to OfferImage', () => {
    render(<OfferGallery offer={mockOffer} />);

    const mockCalls = vi.mocked(OfferImage).mock.calls;

    expect(mockCalls[0][0]).toEqual({
      imgSrc: '/img/room.jpg',
      imgAlt: 'Beautiful Apartment',
    });

    expect(mockCalls[1][0]).toEqual({
      imgSrc: '/img/apartment-01.jpg',
      imgAlt: 'Beautiful Apartment',
    });
  });

  it('should render nothing if offer.images is empty', () => {
    const offerWithoutImages = {
      ...mockOffer,
      images: [],
    };

    render(<OfferGallery offer={offerWithoutImages} />);

    const images = screen.queryAllByTestId('mock-image');
    expect(images).toHaveLength(0);
  });
});
