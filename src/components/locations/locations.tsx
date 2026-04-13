// Import React
import {Link} from 'react-router-dom';

// Import Utils
import {getArrayAllCities} from '../../utils';

// Import Types
import {OffersElementType} from '../../mocks/offers-mocks';

// Import Constants
import {AppRoute} from '../../const';

// Create Types
type LocationsProps = {
  offers: OffersElementType[];
  city: string;
};

// Create Locations
function Locations({offers, city}: LocationsProps): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {getArrayAllCities(offers).map((location) => (
          <li className="locations__item" key={location}>
            <Link to={`${AppRoute.Main}?city=${location.toLowerCase()}`} className={`locations__item-link tabs__item ${city === location.toLowerCase() ? 'tabs__item--active' : ''}`}>
              <span>{location}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Export Locations
export {Locations};
