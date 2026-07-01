import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MainEmpty } from './main-empty';
import { useAppSelector } from '../../hooks/hooks';

vi.mock('../../hooks/hooks', () => ({
  useAppSelector: vi.fn(),
}));

describe('Component: MainEmpty', () => {
  const mockCity = 'Paris';

  beforeEach(() => {
    vi.mocked(useAppSelector).mockReturnValue(mockCity);
  });

  it('should render the main status heading', () => {
    render(<MainEmpty />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });

  it('should render the description with the selected city', () => {
    render(<MainEmpty />);

    const expectedText = `We could not find any property available at the moment in ${mockCity}`;
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render with correct BEM CSS classes', () => {
    render(<MainEmpty />);

    expect(document.querySelector('.cities__no-places')).toBeInTheDocument();
    expect(document.querySelector('.cities__status-wrapper')).toBeInTheDocument();
    expect(document.querySelector('.cities__status')).toBeInTheDocument();
    expect(document.querySelector('.cities__status-description')).toBeInTheDocument();
  });

  it('should update city name when selected city changes', () => {
    const newCity = 'Amsterdam';
    vi.mocked(useAppSelector).mockReturnValue(newCity);

    render(<MainEmpty />);

    expect(
      screen.getByText(`We could not find any property available at the moment in ${newCity}`)
    ).toBeInTheDocument();
  });
});
