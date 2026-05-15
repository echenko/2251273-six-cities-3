// Import React
import { useSearchParams } from 'react-router-dom';
// Import Components
import { Locations } from '../components/locations/locations';
import { Cities } from '../components/cities/cities';
// Import Constants
import { DEFAULT_CITY } from '../const';
// Import Utils
import { filterOffersByCity } from '../utils';
// Import Types
import { OffersElementType } from '../mocks/offers-mocks';
// Import Hooks
import { useAppSelector } from '../hooks/hooks';

// Get City
const getCity = (searchParams: URLSearchParams): string => searchParams.get('city') || DEFAULT_CITY;

// Create Types
type MainPageProps = {
  offers: OffersElementType[];
};

// Create MainPage
function MainPage({ offers }: MainPageProps): JSX.Element {
  const [searchParams] = useSearchParams();
  const filteredOffers = filterOffersByCity(offers, getCity(searchParams));

  const city = useAppSelector((state) => state.city);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <Locations
          offers={offers}
        />
      </div>
      <Cities
        offers={filteredOffers}
        city={city}
      />
    </main>
  );
}

// Export MainPage
export { MainPage };
