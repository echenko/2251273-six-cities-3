import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './layout';
import { AppRoute } from '../../const';

vi.mock('../logo/logo', () => ({
  Logo: vi.fn(({ logoState }) => (
    <div data-testid="logo" data-logo-state={String(logoState)}>
      Logo
    </div>
  )),
}));

vi.mock('../navigation/navigation', () => ({
  Navigation: vi.fn(() => <div data-testid="navigation">Navigation</div>),
}));

vi.mock('../footer/footer', () => ({
  Footer: vi.fn(() => <div data-testid="footer">Footer</div>),
}));

const renderWithRouter = (path: string, outletContent: string = 'Outlet Content') => {
  let routePath = path;
  if (path.startsWith(AppRoute.Offer)) {
    routePath = `${AppRoute.Offer}/:id`;
  }

  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path={routePath} element={<Layout />}>
            <Route index element={<div data-testid="outlet">{outletContent}</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );
};

describe('Layout', () => {
  it('should render Main page correctly', () => {
    renderWithRouter(AppRoute.Main);
    expect(screen.getByTestId('logo')).toHaveAttribute('data-logo-state', 'true');
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  it('should render Offer page correctly', () => {
    renderWithRouter(`${AppRoute.Offer}/123`);
    expect(screen.getByTestId('logo')).toHaveAttribute('data-logo-state', 'false');
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });

  it('should render Login page correctly', () => {
    renderWithRouter(AppRoute.Login);
    expect(screen.getByTestId('logo')).toHaveAttribute('data-logo-state', 'false');
    expect(screen.queryByTestId('navigation')).not.toBeInTheDocument();
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });

  it('should render Favorites page correctly', () => {
    renderWithRouter(AppRoute.Favorites);
    expect(screen.getByTestId('logo')).toHaveAttribute('data-logo-state', 'false');
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should render unknown route with default state', () => {
    renderWithRouter('/unknown');
    expect(screen.getByTestId('logo')).toHaveAttribute('data-logo-state', 'false');
    expect(screen.queryByTestId('navigation')).not.toBeInTheDocument();
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });

  describe('Helmet title', () => {
    it('should set correct title for Main', async () => {
      renderWithRouter(AppRoute.Main);
      await waitFor(() => {
        expect(document.title).toBe('6 cities - Main');
      });
    });

    it('should set correct title for Offer', async () => {
      renderWithRouter(`${AppRoute.Offer}/123`);
      await waitFor(() => {
        expect(document.title).toBe('6 cities - Offer');
      });
    });

    it('should set correct title for Login', async () => {
      renderWithRouter(AppRoute.Login);
      await waitFor(() => {
        expect(document.title).toBe('6 cities - Sign in');
      });
    });

    it('should set correct title for Favorites', async () => {
      renderWithRouter(AppRoute.Favorites);
      await waitFor(() => {
        expect(document.title).toBe('6 cities - Favorites');
      });
    });

    it('should set default title for unknown route', async () => {
      renderWithRouter('/unknown');
      await waitFor(() => {
        expect(document.title).toBe('6 cities');
      });
    });
  });
});
