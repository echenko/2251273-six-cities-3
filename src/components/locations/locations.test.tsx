import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Locations } from './locations';
import { CITIES } from '../../const';

vi.mock('./locations-item', () => ({
  LocationsItem: vi.fn(({ location }) => <li data-testid="location-item">{location}</li>),
}));

import { LocationsItem } from './locations-item';

describe('Компонент Locations', () => {
  it('рендерит элементы для всех городов (проверка DOM)', () => {
    render(<Locations />);
    const items = screen.getAllByTestId('location-item');
    // В StrictMode будет 12 элементов, но мы проверяем, что каждый город присутствует
    const renderedTexts = items.map((el) => el.textContent);
    CITIES.forEach((city) => {
      expect(renderedTexts).toContain(city);
    });
  });

  it('передаёт правильный location в каждый LocationsItem', () => {
    render(<Locations />);
    const mockedItem = vi.mocked(LocationsItem);
    const calledLocations = mockedItem.mock.calls.map((call) => call[0].location);
    CITIES.forEach((city) => {
      expect(calledLocations).toContain(city);
    });
  });

  it('имеет правильные CSS-классы', () => {
    const { container } = render(<Locations />);
    expect(container.querySelector('section.locations.container')).toBeInTheDocument();
    expect(container.querySelector('ul.locations__list.tabs__list')).toBeInTheDocument();
  });
});
