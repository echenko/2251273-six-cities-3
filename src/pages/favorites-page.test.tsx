import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FavoritesPage } from './favorites-page';

// Мокаем компонент Favorites, чтобы тестировать только верстку страницы
vi.mock('../components/favorites/favorites', () => ({
  Favorites: () => <div data-testid="mocked-favorites">Избранное</div>,
}));

describe('FavoritesPage', () => {
  it('должен рендериться без ошибок', () => {
    render(<FavoritesPage />);
    // Если render не упал с ошибкой — тест пройден
  });

  it('должен рендерить тег <main> с правильными классами', () => {
    render(<FavoritesPage />);

    const mainElement = screen.getByRole('main');

    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass('page__main');
    expect(mainElement).toHaveClass('page__main--favorites');
  });

  it('должен рендерить контейнер с правильными классами', () => {
    const { container } = render(<FavoritesPage />);

    // Ищем div по классам, так как у него нет текстового содержимого
    const containerDiv = container.querySelector('.page__favorites-container.container');

    expect(containerDiv).toBeInTheDocument();
  });

  it('должен рендерить компонент Favorites внутри контейнера', () => {
    render(<FavoritesPage />);

    const favoritesComponent = screen.getByTestId('mocked-favorites');

    expect(favoritesComponent).toBeInTheDocument();
    expect(favoritesComponent).toHaveTextContent('Избранное');
  });
});
