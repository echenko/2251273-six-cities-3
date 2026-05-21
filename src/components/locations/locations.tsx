// Import Components
import { LocationsItem } from './locations-item';
// Import Constants
import { CITIES } from '../../const';

// Create Locations
function Locations(): JSX.Element {

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((location, index) => (
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
