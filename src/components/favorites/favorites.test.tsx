import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Favorites } from './favorites';
import { useAppSelector } from '../../hooks/hooks';
import { getFavoriteOffersCities } from '../../utils';
import { OFFERS } from '../../mocks/mock-offers';
import { OffersElementType } from '../../types/offers';

// Мокаем хуки и утилиты
vi.mock('../../hooks/hooks', () => ({
  useAppSelector: vi.fn(),
}));

vi.mock('../../utils', () => ({
  getFavoriteOffersCities: vi.fn(),
}));

// Мокаем дочерний компонент с правильной типизацией
vi.mock('./favorite-item', () => ({
  FavoriteItem: vi.fn(
    ({ city, favoriteOffers }: { city: string; favoriteOffers: OffersElementType[] }) => (
      <li data-testid={`favorite-item-${city}`}>
        {city} (offers: {favoriteOffers.length})
      </li>
    )
  ),
}));

describe('Component: Favorites', () => {
  // Используем vi.mocked для типизированных моков
  const mockUseAppSelector = vi.mocked(useAppSelector);
  const mockGetFavoriteOffersCities = vi.mocked(getFavoriteOffersCities);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with favorite offers grouped by city', () => {
    const mockFavorites: OffersElementType[] = OFFERS;

    // Группируем по городам, как в реальном коде
    const mockGrouped = {
      Paris: mockFavorites.filter((offer) => offer.city.name === 'Paris'),
      Amsterdam: mockFavorites.filter((offer) => offer.city.name === 'Amsterdam'),
    };

    mockUseAppSelector.mockReturnValue(mockFavorites);
    mockGetFavoriteOffersCities.mockReturnValue(mockGrouped);

    render(<Favorites />);

    // Заголовок
    expect(screen.getByText('Saved listing')).toBeInTheDocument();

    // Элементы для каждого города
    const parisItem = screen.getByTestId('favorite-item-Paris');
    const amsterdamItem = screen.getByTestId('favorite-item-Amsterdam');

    expect(parisItem).toBeInTheDocument();
    expect(amsterdamItem).toBeInTheDocument();

    // Проверяем количество предложений
    expect(parisItem).toHaveTextContent(`Paris (offers: ${mockGrouped.Paris.length})`);
    expect(amsterdamItem).toHaveTextContent(`Amsterdam (offers: ${mockGrouped.Amsterdam.length})`);
  });

  it('should render empty list when no favorite offers', () => {
    mockUseAppSelector.mockReturnValue([]);
    mockGetFavoriteOffersCities.mockReturnValue({});

    render(<Favorites />);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    const listItems = screen.queryAllByTestId(/favorite-item-/);
    expect(listItems).toHaveLength(0);
  });

  it('should call getFavoriteOffersCities with correct data', () => {
    const mockFavorites: OffersElementType[] = OFFERS;
    mockUseAppSelector.mockReturnValue(mockFavorites);
    mockGetFavoriteOffersCities.mockReturnValue({ Berlin: mockFavorites });

    render(<Favorites />);

    expect(mockGetFavoriteOffersCities).toHaveBeenCalledWith(mockFavorites);
    expect(mockGetFavoriteOffersCities).toHaveBeenCalledTimes(1);
  });
});
