import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Reviews } from './reviews';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { useParams } from 'react-router-dom';
import { setErrorType } from '../../store/action';
import { AuthorizationStatus, TYPE_OF_ERROR } from '../../const';
import { getSelectedOfferCommentsLoadingStatus } from '../../store/selectors/offer-slice';
import { CommentElementType } from '../../types/comments';
import { fetchCommentsOfferAction } from '../../store/api-actions';

vi.mock('../../hooks/hooks');
vi.mock('react-router-dom');
vi.mock('../../store/api-actions');
vi.mock('../../store/action');
vi.mock('../../store/selectors/offer-slice');
vi.mock('../../utils', () => ({
  sortCommentsByDate: vi.fn((comments: CommentElementType[]) => comments),
}));
vi.mock('./reviews-list', () => ({
  ReviewsList: ({ comments }: { comments: unknown[] }) => (
    <div data-testid="reviews-list">{comments.length} reviews</div>
  ),
}));
vi.mock('./reviews-form', () => ({
  ReviewsForm: () => <div data-testid="reviews-form">Reviews Form</div>,
}));
vi.mock('../message/message', () => ({
  Message: () => <div data-testid="message">Error Message</div>,
}));

describe('Reviews Component', () => {
  const mockDispatch = vi.fn();
  const mockOfferId = 'test-offer-123';

  beforeEach(() => {
    vi.clearAllMocks();

    (useAppDispatch as ReturnType<typeof vi.fn>).mockReturnValue(mockDispatch);
    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({ offerId: mockOfferId });
    (useAppSelector as ReturnType<typeof vi.fn>)
      .mockReturnValueOnce(AuthorizationStatus.NoAuth)
      .mockReturnValueOnce([]);
    (getSelectedOfferCommentsLoadingStatus as ReturnType<typeof vi.fn>).mockReturnValue(true);
  });

  it('должен вызвать fetchCommentsOfferAction при монтировании', () => {
    render(<Reviews />);

    expect(mockDispatch).toHaveBeenCalledWith(
      fetchCommentsOfferAction(mockOfferId)
    );
  });

  it('не должен рендерить ReviewsForm для неавторизованного пользователя', () => {
    render(<Reviews />);

    expect(screen.queryByTestId('reviews-form')).not.toBeInTheDocument();
  });

  it('должен показать Message при ошибке загрузки', () => {
    (getSelectedOfferCommentsLoadingStatus as ReturnType<typeof vi.fn>).mockReturnValue(false);

    render(<Reviews />);

    expect(screen.getByTestId('message')).toBeInTheDocument();
  });

  it('должен вызвать setErrorType при ошибке загрузки', () => {
    (getSelectedOfferCommentsLoadingStatus as ReturnType<typeof vi.fn>).mockReturnValue(false);

    render(<Reviews />);

    expect(mockDispatch).toHaveBeenCalledWith(
      setErrorType(TYPE_OF_ERROR.ERROR_LOADING_COMMENTS)
    );
  });

  it('должен обработать пустой offerId', () => {
    (useParams as ReturnType<typeof vi.fn>).mockReturnValue({ offerId: undefined });

    render(<Reviews />);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('должен корректно обработать отсутствие комментариев', () => {
    (useAppSelector as ReturnType<typeof vi.fn>)
      .mockReturnValueOnce(AuthorizationStatus.NoAuth)
      .mockReturnValueOnce([]);

    render(<Reviews />);

    expect(screen.getByText('0')).toBeInTheDocument();
    const reviewsList = screen.getByTestId('reviews-list');
    expect(reviewsList.textContent).toContain('0 reviews');
  });
});
