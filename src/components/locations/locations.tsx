import { LocationsItem } from './locations-item';
import { CITIES } from '../../const';

function Locations(): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((location) => (
          <LocationsItem
            key={location}
            location={location}
          />
        ))}
      </ul>
    </section>
  );
}

export { Locations };
