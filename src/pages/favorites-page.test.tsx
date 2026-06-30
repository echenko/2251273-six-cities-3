import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FavoritesPage } from './favorites-page';
import { useAppSelector } from '../hooks/hooks';
import { FavoriteType } from '../types/favorite';

vi.mock('../components/favorites/favorites', () => ({
  Favorites: () => <div data-testid="favorites">Favorites Component</div>,
}));

vi.mock('../components/favorites/favorites-empty', () => ({
  FavoritesEmpty: () => <div data-testid="favorites-empty">Favorites Empty Component</div>,
}));

vi.mock('../hooks/hooks', () => ({
  useAppSelector: vi.fn(),
}));

const mockedUseAppSelector = vi.mocked(useAppSelector);

// 🎯 Создаём валидный мок-объект один раз
const mockOffer: FavoriteType = {
  id: '1',
  title: 'Test Offer',
  type: 'apartment',
  price: 100,
  city: { name: 'Paris', location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 } },
  location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
  isFavorite: true,
  isPremium: false,
  rating: 4,
  previewImage: 'image.jpg',
};

describe('FavoritesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render FavoritesEmpty when there are no favorite offers', () => {
    mockedUseAppSelector.mockReturnValue([]);

    render(<FavoritesPage />);

    expect(screen.getByTestId('favorites-empty')).toBeInTheDocument();
    expect(screen.queryByTestId('favorites')).not.toBeInTheDocument();

    const container = document.querySelector('.page__favorites-container');
    expect(container).toHaveClass('page__favorites-container--empty');
  });

  it('should render Favorites when there are favorite offers', () => {
    // 👇 Теперь типизация корректная — без any
    mockedUseAppSelector.mockReturnValue([mockOffer]);

    render(<FavoritesPage />);

    expect(screen.getByTestId('favorites')).toBeInTheDocument();
    expect(screen.queryByTestId('favorites-empty')).not.toBeInTheDocument();

    const container = document.querySelector('.page__favorites-container');
    expect(container).not.toHaveClass('page__favorites-container--empty');
  });
});
