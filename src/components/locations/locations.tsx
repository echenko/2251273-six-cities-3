// Import Components
import { LocationsItem } from './locations-item';
// Import Utils
import { getArrayAllCities } from '../../utils';
// Import Types
import { OffersElementType } from '../../types/offers';


// Create Types
type LocationsProps = {
  offers: OffersElementType[];
};

// Create Locations
function Locations({offers}: LocationsProps): JSX.Element {

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {getArrayAllCities(offers).map((location, index) => (
          <LocationsItem
            key={`${location + index}`}
            location={location}
          />
        ))}
      </ul>
    </section>
  );
}

// Export Locations
export {Locations};
