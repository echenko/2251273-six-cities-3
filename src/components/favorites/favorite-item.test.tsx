import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoriteItem } from './favorite-item';
import { FavoriteType } from '../../types/favorite';
import { AppRoute } from '../../const';
import { OFFERS } from '../../mocks/mock-offers';
import { OffersElementType } from '../../types/offers';

// Мокаем хуки и экшены
vi.mock('../../hooks/hooks', () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock('../../store/action', () => ({
  changeCity: vi.fn(),
}));

// Мокаем дочерний компонент FavoriteCard
vi.mock('./favorites-card', () => ({
  FavoriteCard: vi.fn(({ offer }: { offer: FavoriteType }) => (
    <div data-testid="favorite-card">{offer.title}</div>
  )),
}));

// Импортируем моки после объявления
import { useAppDispatch } from '../../hooks/hooks';
import { changeCity as changeCityAction } from '../../store/action';

describe('Component: FavoriteItem', () => {
  const mockDispatch = vi.fn();
  const mockCity = 'Paris';
  const mockOffers: OffersElementType[] = OFFERS.slice(0, 2);

  beforeEach(() => {
    vi.clearAllMocks();
    // Подставляем мок dispatch
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('should render correctly with favorite offers', () => {
    render(
      <MemoryRouter>
        <FavoriteItem city={mockCity} favoriteOffers={mockOffers} />
      </MemoryRouter>
    );

    // Проверяем название города
    expect(screen.getByText(mockCity)).toBeInTheDocument();

    // Проверяем ссылку: должна вести на главную
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', AppRoute.Main);

    // Проверяем, что каждая карточка отрендерена
    const cards = screen.getAllByTestId('favorite-card');
    expect(cards).toHaveLength(mockOffers.length);
    expect(cards[0]).toHaveTextContent(mockOffers[0].title);
    expect(cards[1]).toHaveTextContent(mockOffers[1].title);
  });

  it('should dispatch changeCity action when link is clicked', () => {
    render(
      <MemoryRouter>
        <FavoriteItem city={mockCity} favoriteOffers={mockOffers} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    fireEvent.click(link);

    // Проверяем, что dispatch вызван с экшеном changeCity(mockCity)
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(changeCityAction).toHaveBeenCalledWith(mockCity);
    // Проверяем, что переданный аргумент в dispatch — это результат вызова changeCity
    expect(mockDispatch).toHaveBeenCalledWith(changeCityAction(mockCity));
  });

  it('should render empty list when favoriteOffers is empty', () => {
    render(
      <MemoryRouter>
        <FavoriteItem city={mockCity} favoriteOffers={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockCity)).toBeInTheDocument();
    const cards = screen.queryAllByTestId('favorite-card');
    expect(cards).toHaveLength(0);
  });

  it('should pass correct offer prop to FavoriteCard', async () => {
    // Проверяем, что FavoriteCard получает правильный offer
    const { FavoriteCard } = await import('./favorites-card');

    render(
      <MemoryRouter>
        <FavoriteItem city={mockCity} favoriteOffers={mockOffers} />
      </MemoryRouter>
    );

    // Проверяем, что FavoriteCard был вызван с правильными пропсами для каждого оффера
    expect(FavoriteCard).toHaveBeenCalledTimes(mockOffers.length);
    mockOffers.forEach((offer, index) => {
      expect(FavoriteCard).toHaveBeenNthCalledWith(
        index + 1,
        expect.objectContaining({ offer }),
        expect.anything() // второй аргумент — контекст
      );
    });
  });
});
