import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Outlet } from 'react-router-dom';
import { App } from './app';
import { AppRoute } from '../../const';

let initialEntries: string[] = ['/'];

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => (
      <actual.MemoryRouter initialEntries={initialEntries}>
        {children}
      </actual.MemoryRouter>
    ),
  };
});

vi.mock('react-helmet-async', () => ({
  HelmetProvider: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock('../styles/styles-global', () => ({
  GlobalStyle: () => null,
}));

vi.mock('../../pages/main-page', () => ({
  MainPage: () => <div data-testid="main-page">Main Page</div>,
}));

vi.mock('../../pages/offer-page', () => ({
  OfferPage: () => <div data-testid="offer-page">Offer Page</div>,
}));

vi.mock('../../pages/login-page', () => ({
  LoginPage: () => <div data-testid="login-page">Login Page</div>,
}));

vi.mock('../../pages/favorites-page', () => ({
  FavoritesPage: () => <div data-testid="favorites-page">Favorites Page</div>,
}));

vi.mock('../layout/layout', () => ({
  Layout: () => (
    <div data-testid="layout">
      <Outlet />
    </div>
  ),
}));

vi.mock('../private/private', () => ({
  Private: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="private">{children}</div>
  ),
}));

vi.mock('../page-not-found/page-not-found', () => ({
  PageNotFound: () => <div data-testid="not-found">404 Not Found</div>,
}));

const mockDispatch = vi.fn().mockResolvedValue(undefined);
const mockUseAppSelector = vi.fn();

vi.mock('../../hooks/hooks', () => {
  const useAppSelectorMock = vi.fn();
  const useAppDispatchMock = vi.fn();

  useAppSelectorMock.mockImplementation((selector: (state: unknown) => unknown) =>
    mockUseAppSelector(selector) as unknown
  );
  useAppDispatchMock.mockImplementation(() => mockDispatch);

  return {
    useAppSelector: useAppSelectorMock,
    useAppDispatch: useAppDispatchMock,
  };
});

vi.mock('../../store/api-actions', () => ({
  checkAuthAction: vi.fn(() => ({ type: 'user/checkAuth' })),
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    initialEntries = ['/'];
    mockDispatch.mockResolvedValue(undefined);
    mockUseAppSelector.mockReturnValue(false);
  });

  describe('Auth initialization', () => {
    it('dispatches checkAuthAction on mount when auth is NOT checked', () => {
      mockUseAppSelector.mockReturnValue(false);

      render(<App />);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });

    it('does NOT dispatch checkAuthAction when auth is already checked', () => {
      mockUseAppSelector.mockReturnValue(true);

      render(<App />);

      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });

  describe('Layout', () => {
    it('renders Layout wrapper for every route', () => {
      render(<App />);

      expect(screen.getByTestId('layout')).toBeInTheDocument();
    });

    it('renders page content inside Layout', () => {
      initialEntries = [AppRoute.Main];

      render(<App />);

      const layout = screen.getByTestId('layout');
      const mainPage = screen.getByTestId('main-page');

      expect(layout).toContainElement(mainPage);
    });
  });

  describe('Routing', () => {
    it('renders MainPage on "/"', () => {
      initialEntries = [AppRoute.Main];

      render(<App />);

      expect(screen.getByTestId('main-page')).toBeInTheDocument();
    });

    it('renders OfferPage on "/offer/:offerId"', () => {
      initialEntries = [`${AppRoute.Offer}/123`];

      render(<App />);

      expect(screen.getByTestId('offer-page')).toBeInTheDocument();
    });

    it('renders LoginPage on "/login"', () => {
      initialEntries = [AppRoute.Login];

      render(<App />);

      expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });

    it('renders FavoritesPage wrapped in Private on "/favorites"', () => {
      initialEntries = [AppRoute.Favorites];

      render(<App />);

      expect(screen.getByTestId('private')).toBeInTheDocument();
      expect(screen.getByTestId('favorites-page')).toBeInTheDocument();
    });

    it('renders PageNotFound on unknown route', () => {
      initialEntries = ['/this-route-does-not-exist'];

      render(<App />);

      expect(screen.getByTestId('not-found')).toBeInTheDocument();
    });
  });

  describe('Private routes', () => {
    it('wraps FavoritesPage with Private component', () => {
      initialEntries = [AppRoute.Favorites];

      render(<App />);

      const privateWrapper = screen.getByTestId('private');
      const favoritesPage = screen.getByTestId('favorites-page');

      expect(privateWrapper).toContainElement(favoritesPage);
    });

    it('does NOT wrap public pages with Private', () => {
      initialEntries = [AppRoute.Main];

      render(<App />);

      expect(screen.queryByTestId('private')).not.toBeInTheDocument();
    });
  });
});
