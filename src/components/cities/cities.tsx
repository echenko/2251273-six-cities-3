// Import Components
import CitiesPlaces from './cities-places';
import Map from '../map/map';
// Import Types
import { OffersElementType } from '../../mocks/offers-mocks';

// Create Cities
function Cities({offers}: {offers: OffersElementType[]}): JSX.Element {
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
export default Cities;
