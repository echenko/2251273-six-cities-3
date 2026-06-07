import { LocationsItem } from './locations-item';
import { CITIES } from '../../const';
import { memo } from 'react';

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

const LocationsMemo = memo(Locations);

export { LocationsMemo as Locations };
