import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OfferRating } from './offer-rating';
import { convertRatingToStars } from '../../utils';
import { OfferType } from '../../types/offer';

vi.mock('../../utils', () => ({
  convertRatingToStars: vi.fn(),
}));

describe('OfferRating', () => {
  const mockOffer: OfferType = {
    id: '1',
    title: 'Test offer',
    rating: 4.2,
  } as OfferType;

  it('should render rating value correctly', () => {
    render(<OfferRating offer={mockOffer} />);

    const ratingValue = screen.getByText(`${mockOffer.rating}`);
    expect(ratingValue).toBeInTheDocument();
    expect(ratingValue).toHaveClass('offer__rating-value');
  });

  it('should call convertRatingToStars with correct rating', () => {
    render(<OfferRating offer={mockOffer} />);

    expect(convertRatingToStars).toHaveBeenCalledWith(Math.round(mockOffer.rating));
  });

  it('should render correct structure with classes', () => {
    render(<OfferRating offer={mockOffer} />);

    const ratingContainer = document.querySelector('.offer__rating');
    expect(ratingContainer).toBeInTheDocument();
    expect(ratingContainer).toHaveClass('rating');

    const starsContainer = document.querySelector('.offer__stars');
    expect(starsContainer).toBeInTheDocument();
    expect(starsContainer).toHaveClass('rating__stars');

    const ratingValue = document.querySelector('.offer__rating-value');
    expect(ratingValue).toBeInTheDocument();
    expect(ratingValue).toHaveClass('rating__value');
  });

  it('should render visually hidden "Rating" text', () => {
    render(<OfferRating offer={mockOffer} />);

    const visuallyHidden = screen.getByText('Rating');
    expect(visuallyHidden).toBeInTheDocument();
    expect(visuallyHidden).toHaveClass('visually-hidden');
  });
});
