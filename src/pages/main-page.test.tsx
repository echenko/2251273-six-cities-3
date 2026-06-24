import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MainPage } from './main-page';
import { OffersElementType } from '../types/offers';

// Мокаем Redux хуки
const mockDispatch = vi.fn();
vi.mock('../hooks/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: vi.fn(),
}));

// Мокаем селекторы
vi.mock('../store/selectors/city-slice', () => ({
  getSelectedCity: vi.fn(),
}));

vi.mock('../store/selectors/offers-slice', () => ({
  getOffers: vi.fn(),
}));

vi.mock('../store/selectors/sorting-slice', () => ({
  getSelectedSorting: vi.fn(),
}));

vi.mock('../store/selectors/error-slice', () => ({
  checkErrorEmptyOffers: vi.fn(),
}));

// Мокаем action
vi.mock('../store/api-actions', () => ({
  fetchOffersAction: vi.fn(() => ({ type: 'FETCH_OFFERS' })),
}));

// Мокаем утилиты
vi.mock('../utils', () => ({
  filterOffersByCity: vi.fn((offers: OffersElementType[]) => offers),
  getSortedOffersByType: vi.fn((offers: OffersElementType[]) => offers),
}));

// Мокаем дочерние компоненты
vi.mock('../components/locations/locations', () => ({
  Locations: () => <div data-testid="locations">Locations</div>,
}));

vi.mock('../components/cities/cities', () => ({
  Cities: ({ offers, city }: { offers: OffersElementType[]; city: string }) => (
    <div data-testid="cities">
      <span data-testid="city-name">{city}</span>
      <span data-testid="offers-count">{offers.length}</span>
    </div>
  ),
}));

// Импортируем после моков
import { useAppSelector } from '../hooks/hooks';
import { getSelectedCity } from '../store/selectors/city-slice';
import { getOffers } from '../store/selectors/offers-slice';
import { getSelectedSorting } from '../store/selectors/sorting-slice';
import { checkErrorEmptyOffers } from '../store/selectors/error-slice';
import { fetchOffersAction } from '../store/api-actions';
import { filterOffersByCity, getSortedOffersByType } from '../utils';

describe('MainPage', () => {
  const mockCity = 'Paris';
  const mockOffers = [
    { id: '1', title: 'Offer 1' },
    { id: '2', title: 'Offer 2' },
  ];
  const mockSorting = 'popular';

  beforeEach(() => {
    vi.clearAllMocks();

    // Настраиваем моки селекторов
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === getSelectedCity) {
        return mockCity;
      }
      if (selector === getOffers) {
        return mockOffers;
      }
      if (selector === getSelectedSorting) {
        return mockSorting;
      }
      if (selector === checkErrorEmptyOffers) {
        return false;
      }
      return undefined;
    });
  });

  it('должен рендериться без ошибок', () => {
    render(<MainPage />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('должен вызывать fetchOffersAction при монтировании', () => {
    render(<MainPage />);
    expect(mockDispatch).toHaveBeenCalledWith(fetchOffersAction());
  });

  it('должен рендерить заголовок с классом visually-hidden', () => {
    render(<MainPage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Cities');
    expect(heading).toHaveClass('visually-hidden');
  });

  it('должен рендерить компонент Locations', () => {
    render(<MainPage />);
    expect(screen.getByTestId('locations')).toBeInTheDocument();
  });

  it('должен рендерить компонент Cities с правильными пропсами', () => {
    render(<MainPage />);

    const citiesComponent = screen.getByTestId('cities');
    expect(citiesComponent).toBeInTheDocument();

    expect(screen.getByTestId('city-name')).toHaveTextContent(mockCity);
    expect(screen.getByTestId('offers-count')).toHaveTextContent('2');
  });

  it('должен применять класс page__main--index-empty когда offers пустые', () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === getSelectedCity) {
        return mockCity;
      }
      if (selector === getOffers) {
        return [];
      }
      if (selector === getSelectedSorting) {
        return mockSorting;
      }
      if (selector === checkErrorEmptyOffers) {
        return true;
      }
      return undefined;
    });

    render(<MainPage />);

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('page__main--index-empty');
  });

  it('должен фильтровать и сортировать предложения', () => {
    render(<MainPage />);

    expect(filterOffersByCity).toHaveBeenCalledWith(mockOffers, mockCity);
    expect(getSortedOffersByType).toHaveBeenCalled();
  });
});
