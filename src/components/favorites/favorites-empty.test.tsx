import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FavoritesEmpty } from './favorites-empty';

describe('FavoritesEmpty', () => {
  it('renders the main section with correct CSS classes', () => {
    const { container } = render(<FavoritesEmpty />);

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('favorites', 'favorites--empty');
  });

  it('renders the visually hidden heading', () => {
    render(<FavoritesEmpty />);

    const heading = screen.getByRole('heading', {
      name: /favorites \(empty\)/i,
      level: 1
    });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Favorites (empty)');
    expect(heading).toHaveClass('visually-hidden');
  });

  it('renders the "Nothing yet saved" status message', () => {
    render(<FavoritesEmpty />);

    const status = screen.getByText('Nothing yet saved.');

    expect(status).toBeInTheDocument();
    expect(status.tagName).toBe('B');
    expect(status).toHaveClass('favorites__status');
  });

  it('renders the status description paragraph', () => {
    render(<FavoritesEmpty />);

    const description = screen.getByText(/Save properties to narrow down search/i);

    expect(description).toBeInTheDocument();
    expect(description.tagName).toBe('P');
    expect(description).toHaveClass('favorites__status-description');
    expect(description).toHaveTextContent('Save properties to narrow down search or plan your future trips.');
  });

});
