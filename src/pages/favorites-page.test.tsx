import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';

import { FavoritesPage } from './favorites-page';
import { useAppSelector } from '../hooks/hooks';

// 1. Мокаем дочерние компоненты
vi.mock('../components/favorites/favorites', () => ({
  Favorites: () => <div data-testid="mocked-favorites">Избранное</div>,
}));

vi.mock('../components/favorites/favorites-empty', () => ({
  FavoritesEmpty: () => <div data-testid="mocked-favorites-empty">Нет избранного</div>,
}));

// 2. Мокаем хук useAppSelector
vi.mock('../hooks/hooks', () => ({
  useAppSelector: vi.fn(),
}));

describe('FavoritesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('должен рендериться без ошибок', () => {
    vi.mocked(useAppSelector).mockReturnValue([]);
    render(<FavoritesPage />);
  });

  it('должен рендерить тег <main> с правильными классами', () => {
    vi.mocked(useAppSelector).mockReturnValue([]);
    render(<FavoritesPage />);

    const mainElement = screen.getByRole('main');

    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass('page__main');
    expect(mainElement).toHaveClass('page__main--favorites');
  });

  describe('когда есть избранные предложения', () => {
    it('должен рендерить компонент Favorites', () => {
      vi.mocked(useAppSelector).mockReturnValue([{ id: '1' }]);
      render(<FavoritesPage />);

      const favoritesComponent = screen.getByTestId('mocked-favorites');

      expect(favoritesComponent).toBeInTheDocument();
      expect(favoritesComponent).toHaveTextContent('Избранное');
    });

    it('НЕ должен рендерить компонент FavoritesEmpty', () => {
      vi.mocked(useAppSelector).mockReturnValue([{ id: '1' }]);
      render(<FavoritesPage />);

      expect(screen.queryByTestId('mocked-favorites-empty')).not.toBeInTheDocument();
    });

    it('должен рендерить контейнер БЕЗ класса --empty', () => {
      vi.mocked(useAppSelector).mockReturnValue([{ id: '1' }]);
      const { container } = render(<FavoritesPage />);

      const containerDiv = container.querySelector('.page__favorites-container');

      expect(containerDiv).toBeInTheDocument();
      expect(containerDiv).toHaveClass('page__favorites-container');
      expect(containerDiv).toHaveClass('container');
      expect(containerDiv).not.toHaveClass('page__favorites-container--empty');
    });
  });

  describe('когда избранных предложений НЕТ', () => {
    it('должен рендерить компонент FavoritesEmpty', () => {
      vi.mocked(useAppSelector).mockReturnValue([]);
      render(<FavoritesPage />);

      const emptyComponent = screen.getByTestId('mocked-favorites-empty');

      expect(emptyComponent).toBeInTheDocument();
      expect(emptyComponent).toHaveTextContent('Нет избранного');
    });

    it('НЕ должен рендерить компонент Favorites', () => {
      vi.mocked(useAppSelector).mockReturnValue([]);
      render(<FavoritesPage />);

      expect(screen.queryByTestId('mocked-favorites')).not.toBeInTheDocument();
    });

    it('должен рендерить контейнер С классом --empty', () => {
      vi.mocked(useAppSelector).mockReturnValue([]);
      const { container } = render(<FavoritesPage />);

      const containerDiv = container.querySelector('.page__favorites-container');

      expect(containerDiv).toBeInTheDocument();
      expect(containerDiv).toHaveClass('page__favorites-container');
      expect(containerDiv).toHaveClass('container');
      expect(containerDiv).toHaveClass('page__favorites-container--empty');
    });
  });
});
