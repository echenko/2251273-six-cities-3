// Import React
import { useSearchParams } from 'react-router-dom';

// Import Components
import { Locations } from '../components/locations/locations';
import { Cities } from '../components/cities/cities';

// Import Types
import { OffersElementType } from '../mocks/offers-mocks';

// Create Types
type MainPageProps = {
  offers: OffersElementType[];
};

// Create MainPage
function MainPage({ offers }: MainPageProps): JSX.Element {
  const [searchParams] = useSearchParams();

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <Locations
          offers={offers}
          city={searchParams.get('city') || ''}
        />
      </div>
      <Cities offers={offers} />
    </main>
  );
}

// Export MainPage
export { MainPage };
