import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from './login-page';
import { CITIES, AppRoute } from '../const';

// 1. Частичный мокинг для Login
vi.mock('../components/login/login', async () => {
  const actual = await vi.importActual<typeof import('../components/login/login')>('../components/login/login');
  return {
    ...actual,
    Login: () => <div data-testid="login-mock">Login Form</div>,
  };
});

const mockChangeCity = vi.fn((city: string) => ({ type: 'city/changeCity', payload: city }));

// 2. Частичный мокинг для action (исправление вашей ошибки)
vi.mock('../store/action', async () => {
  const actual = await vi.importActual<typeof import('../store/action')>('../store/action');
  return {
    ...actual,
    changeCity: (city: string) => mockChangeCity(city),
  };
});

const mockDispatch = vi.fn();

// 3. Частичный мокинг для hooks
vi.mock('../hooks/hooks', async () => {
  const actual = await vi.importActual<typeof import('../hooks/hooks')>('../hooks/hooks');
  return {
    ...actual,
    useAppDispatch: () => mockDispatch,
  };
});

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = (component: JSX.Element) => render(<MemoryRouter>{component}</MemoryRouter>);

  it('should render main structure correctly', () => {
    renderWithRouter(<LoginPage />);

    const mainElement = document.querySelector('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass('page__main', 'page__main--login');

    expect(screen.getByTestId('login-mock')).toBeInTheDocument();

    const locationsSection = document.querySelector('.locations');
    expect(locationsSection).toBeInTheDocument();
    expect(locationsSection).toHaveClass('locations--login', 'locations--current');

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', AppRoute.Main);

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

    expect(mockDispatch).toHaveBeenCalled();

    const citySpan = screen.getByRole('link').querySelector('span');
    const displayedCity = citySpan?.textContent;

    expect(displayedCity).toBeDefined();
    expect(mockChangeCity).toHaveBeenCalledWith(displayedCity);

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
});
