import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from './card';
import { OffersElementType } from '../../types/offers';

// Мокаем все дочерние компоненты, чтобы тестировать только логику Card
vi.mock('./card-mark', () => ({
  CardMark: () => <div data-testid="card-mark">Premium</div>,
}));

interface CardImageProps {
  cardImgSrc: string;
  cardImgAlt: string;
  offerId: string;
}

vi.mock('./card-image', () => ({
  CardImage: ({ cardImgSrc, cardImgAlt, offerId }: CardImageProps) => (
    <img
      data-testid="card-image"
      src={cardImgSrc}
      alt={cardImgAlt}
      data-offer-id={offerId}
    />
  ),
}));

interface CardPriceProps {
  offer: OffersElementType;
}

vi.mock('./card-price', () => ({
  CardPrice: ({ offer }: CardPriceProps) => (
    <div data-testid="card-price">{offer.price}€</div>
  ),
}));

interface CardRatingProps {
  cardRating: number;
}

vi.mock('./card-rating', () => ({
  CardRating: ({ cardRating }: CardRatingProps) => (
    <div data-testid="card-rating">{cardRating}</div>
  ),
}));

interface CardNameProps {
  cardName: string;
  offerId: string;
}

vi.mock('./card-name', () => ({
  CardName: ({ cardName, offerId }: CardNameProps) => (
    <a data-testid="card-name" href={`/offer/${offerId}`}>
      {cardName}
    </a>
  ),
}));

interface CardTypeProps {
  cardType: string;
}

vi.mock('./card-type', () => ({
  CardType: ({ cardType }: CardTypeProps) => (
    <div data-testid="card-type">{cardType}</div>
  ),
}));

describe('Card component', () => {
  const mockOffer: OffersElementType = {
    'id': '831162e9-478b-4df9-9432-85be2bb5f531',
    'title': 'The Joshua Tree House',
    'type': 'room',
    'price': 288,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/10.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.868610000000004,
      'longitude': 2.342499,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': true,
    'rating': 4.6
  };

  const onOfferHover = vi.fn();

  it('should render offer data correctly', () => {
    render(<Card offer={mockOffer} onOfferHover={onOfferHover} />);

    // Проверяем, что все дочерние компоненты получили правильные пропсы
    expect(screen.getByTestId('card-image')).toHaveAttribute('src', 'https://15.design.htmlacademy.pro/static/hotel/10.jpg');
    expect(screen.getByTestId('card-rating')).toHaveTextContent('4.6');
    expect(screen.getByTestId('card-name')).toHaveTextContent('The Joshua Tree House');
    expect(screen.getByTestId('card-type')).toHaveTextContent('room');
  });

  it('should show premium mark when offer.isPremium is true', () => {
    render(<Card offer={mockOffer} onOfferHover={onOfferHover} />);
    expect(screen.getByTestId('card-mark')).toBeInTheDocument();
  });

  it('should not show premium mark when offer.isPremium is false', () => {
    const nonPremiumOffer = { ...mockOffer, isPremium: false };
    render(<Card offer={nonPremiumOffer} onOfferHover={onOfferHover} />);
    expect(screen.queryByTestId('card-mark')).not.toBeInTheDocument();
  });

  it('should call onOfferHover with null on mouse leave', async () => {
    const user = userEvent.setup();
    render(<Card offer={mockOffer} onOfferHover={onOfferHover} />);

    const article = screen.getByRole('article');
    await user.hover(article);
    await user.unhover(article);

    expect(onOfferHover).toHaveBeenLastCalledWith('');
  });

  it('should call onOfferHover with offer id on mouse enter', async () => {
    const user = userEvent.setup();
    render(<Card offer={mockOffer} onOfferHover={onOfferHover} />);
    const article = screen.getByRole('article');
    await user.hover(article);
    expect(onOfferHover).toHaveBeenCalledWith('831162e9-478b-4df9-9432-85be2bb5f531');
  });
});
