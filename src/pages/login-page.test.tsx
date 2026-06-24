import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from './login-page';
import { CITIES, AppRoute } from '../const';

// 1. Мокаем дочерний компонент Login
vi.mock('../components/login/login', () => ({
  Login: () => <div data-testid="login-mock">Login Form</div>,
}));

// 2. Мокаем Redux action
const mockChangeCity = vi.fn((city: string) => ({ type: 'city/changeCity', payload: city }));
vi.mock('../store/action', () => ({
  changeCity: (city: string) => mockChangeCity(city),
}));

// 3. Мокаем хук useAppDispatch
const mockDispatch = vi.fn();
vi.mock('../hooks/hooks', () => ({
  useAppDispatch: () => mockDispatch,
}));

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = (component: JSX.Element) => render(<MemoryRouter>{component}</MemoryRouter>);

  it('should render main structure correctly', () => {
    renderWithRouter(<LoginPage />);

    // 1. Проверяем main элемент
    const mainElement = document.querySelector('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass('page__main', 'page__main--login');

    // 2. Проверяем, что отрендерился компонент Login
    expect(screen.getByTestId('login-mock')).toBeInTheDocument();

    // 3. Проверяем наличие секции locations (по классу, а не по тексту)
    const locationsSection = document.querySelector('.locations');
    expect(locationsSection).toBeInTheDocument();
    expect(locationsSection).toHaveClass('locations--login', 'locations--current');

    // 4. Проверяем наличие ссылки на главную страницу
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', AppRoute.Main);

    // 5. Проверяем, что отображается какой-то город из списка CITIES
    const citySpan = link.querySelector('span');
    expect(citySpan).toBeInTheDocument();
    expect(CITIES).toContain(citySpan?.textContent);
  });

  it('should display a random city from CITIES array', () => {
    renderWithRouter(<LoginPage />);

    const citySpan = screen.getByRole('link').querySelector('span');
    expect(citySpan).toBeInTheDocument();

    const displayedCity = citySpan?.textContent;
    expect(displayedCity).toBeDefined();
    expect(CITIES).toContain(displayedCity);
  });

  it('should dispatch changeCity action with selected city on mount', () => {
    renderWithRouter(<LoginPage />);

    expect(mockDispatch).toHaveBeenCalledTimes(1);

    const citySpan = screen.getByRole('link').querySelector('span');
    const displayedCity = citySpan?.textContent;

    expect(displayedCity).toBeDefined();
    expect(mockChangeCity).toHaveBeenCalledWith(displayedCity);

    // ✅ Исправление: используем expect.objectContaining вместо прямого сравнения объектов
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'city/changeCity',
        payload: displayedCity
      })
    );
  });

  it('should render link to main page', () => {
    renderWithRouter(<LoginPage />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', AppRoute.Main);
    expect(link).toHaveClass('locations__item-link');
  });

  it('should render locations section with correct classes', () => {
    renderWithRouter(<LoginPage />);

    const locationsSection = document.querySelector('.locations');
    expect(locationsSection).toBeInTheDocument();
    expect(locationsSection).toHaveClass(
      'locations--login',
      'locations--current'
    );
  });

  it('should call getRandomCity and use result consistently', () => {
    const mockRandom = vi.spyOn(Math, 'random').mockReturnValue(0.5);

    renderWithRouter(<LoginPage />);

    const expectedIndex = Math.floor(0.5 * CITIES.length);
    const expectedCity = CITIES[expectedIndex];

    const citySpan = screen.getByRole('link').querySelector('span');
    expect(citySpan?.textContent).toBe(expectedCity);

    expect(mockChangeCity).toHaveBeenCalledWith(expectedCity);
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'city/changeCity',
        payload: expectedCity
      })
    );

    mockRandom.mockRestore();
  });

  it('should have correct container structure', () => {
    renderWithRouter(<LoginPage />);

    const container = document.querySelector('.page__login-container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('container');

    const locationsItem = document.querySelector('.locations__item');
    expect(locationsItem).toBeInTheDocument();
  });

  it('should re-dispatch changeCity if city changes', () => {
    const mockRandom = vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.9);

    const { rerender } = renderWithRouter(<LoginPage />);

    expect(mockDispatch).toHaveBeenCalledTimes(1);

    rerender(<MemoryRouter><LoginPage /></MemoryRouter>);

    expect(mockDispatch).toHaveBeenCalledTimes(2);

    mockRandom.mockRestore();
  });
});
