// Import Components
import { LocationsItem } from './locations-item';
// Import Utils
import { getArrayAllCities } from '../../utils';
// Import Types
import { useAppSelector } from '../../hooks/hooks';

// Create Locations
function Locations(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);

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
