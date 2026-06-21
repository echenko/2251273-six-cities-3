import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Logo } from './logo';
import { AppRoute, DEFAULT_CITY, DEFAULT_SORTING } from '../../const';
import * as hooks from '../../hooks/hooks';
import * as actions from '../../store/action';
import * as apiActions from '../../store/api-actions';

vi.mock('../../hooks/hooks', () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock('../../store/action', () => ({
  changeCity: vi.fn(),
  changeSorting: vi.fn(),
  setErrorType: vi.fn(),
}));

vi.mock('../../store/api-actions', () => ({
  checkAuthAction: vi.fn(),
}));

describe('Logo component', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(hooks.useAppDispatch).mockReturnValue(mockDispatch);
  });

  const renderWithProviders = (logoState: boolean) => {
    const store = configureStore({
      reducer: {
        app: (state: Record<string, never> = {}) => state,
      },
    });

    return render(
      <Provider store={store}>
        <MemoryRouter>
          <Logo logoState={logoState} />
        </MemoryRouter>
      </Provider>
    );
  };

  it('renders logo image with correct src and alt', () => {
    renderWithProviders(false);
    const img = screen.getByAltText('6 cities logo');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'img/logo.svg');
    expect(img).toHaveAttribute('width', '81');
    expect(img).toHaveAttribute('height', '41');
  });

  it('applies active class when logoState is true', () => {
    renderWithProviders(true);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('header__logo-link--active');
  });

  it('does not apply active class when logoState is false', () => {
    renderWithProviders(false);
    const link = screen.getByRole('link');
    expect(link).not.toHaveClass('header__logo-link--active');
  });

  it('has link to main page', () => {
    renderWithProviders(false);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', AppRoute.Main);
  });

  it('dispatches checkAuthAction on mount (useEffect)', () => {
    renderWithProviders(false);
    expect(apiActions.checkAuthAction).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(apiActions.checkAuthAction());
  });

  it('dispatches city, sorting and error reset on click, but not checkAuthAction again', async () => {
    const user = userEvent.setup();
    renderWithProviders(false);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(apiActions.checkAuthAction());

    const link = screen.getByRole('link');
    await user.click(link);

    expect(actions.changeCity).toHaveBeenCalledTimes(1);
    expect(actions.changeCity).toHaveBeenCalledWith(DEFAULT_CITY);
    expect(actions.changeSorting).toHaveBeenCalledTimes(1);
    expect(actions.changeSorting).toHaveBeenCalledWith(DEFAULT_SORTING);
    expect(actions.setErrorType).toHaveBeenCalledTimes(1);
    expect(actions.setErrorType).toHaveBeenCalledWith(null);

    expect(mockDispatch).toHaveBeenCalledTimes(4);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, apiActions.checkAuthAction());
    expect(mockDispatch).toHaveBeenNthCalledWith(2, actions.changeCity(DEFAULT_CITY));
    expect(mockDispatch).toHaveBeenNthCalledWith(3, actions.changeSorting(DEFAULT_SORTING));
    expect(mockDispatch).toHaveBeenNthCalledWith(4, actions.setErrorType(null));
  });

  it('is memoized', () => {
    // Приводим компонент к типу React.MemoExoticComponent для доступа к $$typeof
    const MemoComponent = Logo as React.MemoExoticComponent<React.FC<{ logoState: boolean }>>;
    expect(MemoComponent.$$typeof).toBe(Symbol.for('react.memo'));
  });
});
