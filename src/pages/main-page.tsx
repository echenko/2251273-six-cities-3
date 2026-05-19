// Import Components
import { Locations } from '../components/locations/locations';
import { Cities } from '../components/cities/cities';
// Import Utils
import { filterOffersByCity } from '../utils';
// Import Hooks
import { useAppSelector } from '../hooks/hooks';

// Create MainPage
function MainPage(): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const filteredOffers = filterOffersByCity(offers, city);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <Locations/>
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
