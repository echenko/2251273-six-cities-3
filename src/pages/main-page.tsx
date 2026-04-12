// Import Components
import {Header} from '../components/header/header';
import {Locations} from '../components/locations/locations';
import {Cities} from '../components/cities/cities';
// Import Types
import {OffersElementType} from '../mocks/offers-mocks';
// Create Types
type MainPageProps = {
  offers: OffersElementType[];
};

// Create MainPage
function MainPage({ offers }: MainPageProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header offers={offers} />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Locations offers={offers} />
        </div>
        <Cities offers={offers} />
      </main>
    </div>
  );
}

// Export MainPage
export {MainPage};
