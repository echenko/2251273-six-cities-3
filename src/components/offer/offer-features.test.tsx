import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OfferFeatures } from './offer-features';
import type { OfferType } from '../../types/offer';

describe('OfferFeatures', () => {
  const createMockOffer = (
    type: string = 'apartment',
    bedrooms: number = 2,
    maxAdults: number = 4
  ): OfferType => ({
    id: 'offer-1',
    title: 'Test Offer',
    type,
    price: 100,
    city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 } },
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    description: 'Test description',
    bedrooms,
    goods: ['Wi-Fi'],
    host: { name: 'John', avatarUrl: 'avatar.jpg', isPro: false },
    images: ['image1.jpg'],
    maxAdults,
  });

  it('должен корректно рендериться', () => {
    const offer = createMockOffer();
    const { container } = render(<OfferFeatures offer={offer} />);

    expect(container).toBeInTheDocument();
  });

  it('должен отображать тип оффера', () => {
    const offer = createMockOffer('apartment');
    render(<OfferFeatures offer={offer} />);

    expect(screen.getByText('apartment')).toBeInTheDocument();
    expect(screen.getByText('apartment')).toHaveClass('offer__feature--entire');
  });

  it('должен отображать количество спален', () => {
    const offer = createMockOffer('apartment', 3);
    render(<OfferFeatures offer={offer} />);

    expect(screen.getByText('3 Bedrooms')).toBeInTheDocument();
    expect(screen.getByText('3 Bedrooms')).toHaveClass('offer__feature--bedrooms');
  });

  it('должен отображать максимальное количество взрослых с правильным плюрализмом (1 adult)', () => {
    const offer = createMockOffer('apartment', 2, 1);
    render(<OfferFeatures offer={offer} />);

    expect(screen.getByText('Max 1 adult')).toBeInTheDocument();
    expect(screen.getByText('Max 1 adult')).toHaveClass('offer__feature--adults');
  });

  it('должен отображать максимальное количество взрослых с правильным плюрализмом (2 adults)', () => {
    const offer = createMockOffer('apartment', 2, 2);
    render(<OfferFeatures offer={offer} />);

    expect(screen.getByText('Max 2 adults')).toBeInTheDocument();
  });

  it('должен отображать максимальное количество взрослых с правильным плюрализмом (4 adults)', () => {
    const offer = createMockOffer('apartment', 2, 4);
    render(<OfferFeatures offer={offer} />);

    expect(screen.getByText('Max 4 adults')).toBeInTheDocument();
  });

  it('должен отображать максимальное количество взрослых с правильным плюрализмом (0 adults)', () => {
    const offer = createMockOffer('apartment', 2, 0);
    render(<OfferFeatures offer={offer} />);

    expect(screen.getByText('Max 0 adults')).toBeInTheDocument();
  });

  it('должен иметь правильные CSS классы', () => {
    const offer = createMockOffer();
    const { container } = render(<OfferFeatures offer={offer} />);

    const featuresList = container.querySelector('.offer__features');
    expect(featuresList).toBeInTheDocument();
    expect(featuresList?.tagName).toBe('UL');

    const features = container.querySelectorAll('.offer__feature');
    expect(features).toHaveLength(3);

    expect(features[0]).toHaveClass('offer__feature--entire');
    expect(features[1]).toHaveClass('offer__feature--bedrooms');
    expect(features[2]).toHaveClass('offer__feature--adults');
  });

  it('должен иметь правильную структуру DOM', () => {
    const offer = createMockOffer();
    const { container } = render(<OfferFeatures offer={offer} />);

    const featuresList = container.querySelector('.offer__features');
    expect(featuresList?.tagName).toBe('UL');

    const listItems = featuresList?.querySelectorAll('li');
    expect(listItems?.length).toBe(3);

    listItems?.forEach((item) => {
      expect(item.tagName).toBe('LI');
      expect(item).toHaveClass('offer__feature');
    });
  });

  it('должен отображать все три характеристики', () => {
    const offer = createMockOffer('house', 5, 8);
    render(<OfferFeatures offer={offer} />);

    expect(screen.getByText('house')).toBeInTheDocument();
    expect(screen.getByText('5 Bedrooms')).toBeInTheDocument();
    expect(screen.getByText('Max 8 adults')).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });

  it('должен корректно отображать разные типы офферов', () => {
    const offer = createMockOffer('room');
    render(<OfferFeatures offer={offer} />);

    expect(screen.getByText('room')).toBeInTheDocument();
  });

  it('должен корректно отображать одну спальню', () => {
    const offer = createMockOffer('apartment', 1, 2);
    render(<OfferFeatures offer={offer} />);

    expect(screen.getByText('1 Bedroom')).toBeInTheDocument();
  });

  it('должен корректно отображать много спален', () => {
    const offer = createMockOffer('apartment', 10, 20);
    render(<OfferFeatures offer={offer} />);

    expect(screen.getByText('10 Bedrooms')).toBeInTheDocument();
    expect(screen.getByText('Max 20 adults')).toBeInTheDocument();
  });

  it('должен сохранять порядок характеристик', () => {
    const offer = createMockOffer('villa', 4, 6);
    const { container } = render(<OfferFeatures offer={offer} />);

    const listItems = container.querySelectorAll('.offer__feature');

    expect(listItems[0]).toHaveTextContent('villa');
    expect(listItems[1]).toHaveTextContent('4 Bedrooms');
    expect(listItems[2]).toHaveTextContent('Max 6 adults');
  });
});
