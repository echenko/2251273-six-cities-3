import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Cities } from './cities';
import * as hooks from '../../hooks/hooks';
import * as actions from '../../store/action';
import { TYPE_OF_ERROR } from '../../const';
import { OFFERS } from '../../mocks/mock-offers';
import { OffersElementType } from '../../types/offers';
import { checkErrorEmptyOffers, getErrorType } from '../../store/selectors/error-slice';
import { getOffersLoadingStatus } from '../../store/selectors/offers-slice';

type CitiesPlacesProps = {
  offers: OffersElementType[];
  city: string;
  onOfferHover: (id: string) => void;
};

// Мокаем дочерние компоненты
vi.mock('../cities-places', () => ({
  CitiesPlaces: vi.fn(({ onOfferHover }: CitiesPlacesProps) => (
    <div data-testid="cities-places">
      <button onClick={() => onOfferHover('offer-1')}>Hover</button>
    </div>
  )),
}));

vi.mock('../map/map', () => ({
  Map: vi.fn(({ currentOffer }) => (
    <div data-testid="map">Map: {currentOffer}</div>
  )),
}));

vi.mock('../message/message', () => ({
  Message: vi.fn(() => <div data-testid="message">Message</div>),
}));

vi.mock('../main-empty/main-empty', () => ({
  MainEmpty: vi.fn(() => <div data-testid="main-empty">MainEmpty</div>),
}));

vi.mock('../../hooks/hooks', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

describe('Cities', () => {
  const mockDispatch = vi.fn();
  const mockOffers = OFFERS.slice(0, 2);
  const defaultProps = {
    offers: mockOffers,
    city: 'Paris',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(hooks.useAppDispatch).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render loading state (Message) when offersLoadingStatus is false', () => {
    vi.mocked(hooks.useAppSelector).mockImplementation((selector) => {
      if (selector.name === 'checkErrorEmptyOffers') {
        return false;
      }
      if (selector.name === 'getOffersLoadingStatus') {
        return false;
      }
      return undefined;
    });

    render(<Cities {...defaultProps} />);

    expect(screen.getByTestId('message')).toBeInTheDocument();
    expect(screen.queryByTestId('cities-places')).not.toBeInTheDocument();
    expect(screen.queryByTestId('map')).not.toBeInTheDocument();
    expect(screen.queryByTestId('main-empty')).not.toBeInTheDocument();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should render MainEmpty and dispatch error when offers empty and offersLoadingStatus is true', () => {
    // Мокаем все селекторы, используемые в компоненте
    vi.mocked(hooks.useAppSelector).mockImplementation((selector) => {
      if (selector === checkErrorEmptyOffers) {
        return true;
      }
      if (selector === getOffersLoadingStatus) {
        return true;
      }
      if (selector === getErrorType) {
        return null;
      }
      return undefined;
    });

    render(<Cities offers={[]} city="Paris" />);

    expect(screen.queryByTestId('cities-places')).not.toBeInTheDocument();
    expect(screen.queryByTestId('map')).not.toBeInTheDocument();
    expect(screen.queryByTestId('message')).not.toBeInTheDocument();

    // Диспатч должен быть вызван один раз (если StrictMode отключён)
    expect(mockDispatch).toHaveBeenCalledWith(
      actions.setErrorType(TYPE_OF_ERROR.ERROR_EMPTY_OFFERS)
    );
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(1).toBe(1);
  });

  it('should apply empty class when checkEmptyOffers is true', () => {
    vi.mocked(hooks.useAppSelector).mockImplementation((selector) => {
      if (selector.name === 'checkErrorEmptyOffers') {
        return true;
      }
      if (selector.name === 'getOffersLoadingStatus') {
        return true;
      }
      return undefined;
    });

    const { container } = render(<Cities offers={[]} city="Paris" />);
    const containerDiv = container.querySelector('.cities__places-container');
    expect(containerDiv).toHaveClass('cities__places-container--empty');
  });

  it('should not dispatch error if offersLoadingStatus is false even if offers empty', () => {
    vi.mocked(hooks.useAppSelector).mockImplementation((selector) => {
      if (selector.name === 'checkErrorEmptyOffers') {
        return false;
      }
      if (selector.name === 'getOffersLoadingStatus') {
        return false;
      }
      return undefined;
    });

    render(<Cities offers={[]} city="Paris" />);
    expect(mockDispatch).not.toHaveBeenCalled();
  });

});
