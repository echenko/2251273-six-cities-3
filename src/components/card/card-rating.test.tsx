import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardRating } from './card-rating';
import { convertRatingToStars } from '../../utils';

vi.mock('../../utils', () => ({
  convertRatingToStars: vi.fn(),
}));

describe('Component: CardRating', () => {
  it('should render stars with width returned from convertRatingToStars', () => {
    const mockRating = 4.2;
    const mockWidth = '84%';

    (convertRatingToStars as jest.Mock).mockReturnValue(mockWidth);

    const { container } = render(<CardRating cardRating={mockRating} />);

    const starsSpan = container.querySelector('.place-card__stars span');
    expect(starsSpan).toBeInTheDocument();
    expect(starsSpan).toHaveStyle({ width: mockWidth });

    expect(convertRatingToStars).toHaveBeenCalledTimes(1);
    expect(convertRatingToStars).toHaveBeenCalledWith(Math.round(mockRating));
  });

  it('should handle different rating values', () => {
    const testCases = [
      { rating: 0, width: '0%' },
      { rating: 1, width: '20%' },
      { rating: 2.5, width: '50%' },
      { rating: 5, width: '100%' },
    ];

    testCases.forEach(({ rating, width }) => {
      (convertRatingToStars as jest.Mock).mockReturnValue(width);
      const { container } = render(<CardRating cardRating={rating} />);
      const starsSpan = container.querySelector('.place-card__stars span');
      expect(starsSpan).toHaveStyle({ width });
    });
  });

  it('should render visually hidden text "Rating"', () => {
    render(<CardRating cardRating={3} />);
    const hiddenText = screen.getByText('Rating');
    expect(hiddenText).toBeInTheDocument();
    expect(hiddenText).toHaveClass('visually-hidden');
  });

  it('should have correct CSS classes', () => {
    const { container } = render(<CardRating cardRating={4} />);
    const outerDiv = container.querySelector('.place-card__rating');
    const starsDiv = container.querySelector('.place-card__stars');
    expect(outerDiv).toBeInTheDocument();
    expect(starsDiv).toBeInTheDocument();
  });
});
