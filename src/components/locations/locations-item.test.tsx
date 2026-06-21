// locations-item.test.tsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocationsItem } from './locations-item';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changeCity, changeSorting } from '../../store/action';
import { useNavigate } from 'react-router-dom';
import { AppRoute, DEFAULT_SORTING } from '../../const';
import { getSelectedCity } from '../../store/selectors/city-slice';

// Мокаем зависимости
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../../hooks/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../../store/action', () => ({
  changeCity: vi.fn(),
  changeSorting: vi.fn(),
}));

vi.mock('../../store/selectors/city-slice', () => ({
  getSelectedCity: vi.fn(),
}));

describe('LocationsItem', () => {
  const mockDispatch = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });
  it('should render the location name', () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === getSelectedCity) {
        return 'Paris';
      }
      return null;
    });

    render(<LocationsItem location="Paris" />);
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });

  it('should apply active class when location matches selected city', () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === getSelectedCity) {
        return 'Paris';
      }
      return null;
    });

    render(<LocationsItem location="Paris" />);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('tabs__item--active');
  });

  it('should not apply active class when location does not match selected city', () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === getSelectedCity) {
        return 'Amsterdam';
      }
      return null;
    });

    render(<LocationsItem location="Paris" />);
    const link = screen.getByRole('link');
    expect(link).not.toHaveClass('tabs__item--active');
  });

  it('should dispatch actions and navigate on click', async () => {
    const user = userEvent.setup();
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === getSelectedCity) {
        return 'Amsterdam';
      }
      return null;
    });

    render(<LocationsItem location="Paris" />);
    const link = screen.getByRole('link');
    await user.click(link);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenCalledWith(changeCity('Paris'));
    expect(mockDispatch).toHaveBeenCalledWith(changeSorting(DEFAULT_SORTING));
    expect(mockNavigate).toHaveBeenCalledWith(AppRoute.Main);
  });

  it('should not crash when selected city is undefined', async () => {
    const user = userEvent.setup();
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === getSelectedCity) {
        return undefined;
      }
      return null;
    });

    render(<LocationsItem location="Paris" />);
    const link = screen.getByRole('link');
    await user.click(link);

    expect(mockDispatch).toHaveBeenCalledWith(changeCity('Paris'));
    expect(mockDispatch).toHaveBeenCalledWith(changeSorting(DEFAULT_SORTING));
    expect(mockNavigate).toHaveBeenCalledWith(AppRoute.Main);
  });
});
