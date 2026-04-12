// Import Components
import {CitiesPlaces} from './cities-places';
import {Map} from '../map/map';

// Import Types
import {OffersElementType} from '../../mocks/offers-mocks';

// Create Types
type CitiesProps = {
  offers: OffersElementType[];
}

// Create Cities
function Cities({offers}: CitiesProps): JSX.Element {
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <CitiesPlaces offers={offers} />
        <Map />
      </div>
    </div>
  );
}

// Export Cities
export {Cities};
