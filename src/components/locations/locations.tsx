// Import Utils
import {getArrayAllCities } from '../../utils';

// Import Types
import {OffersElementType} from '../../mocks/offers-mocks';

// Create Types
type LocationsProps = {
  offers: OffersElementType[];
};

// Create Locations
function Locations({offers}: LocationsProps): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {getArrayAllCities(offers).map((location) => (
          <li className="locations__item" key={location}>
            <a className="locations__item-link tabs__item tabs__item--active" href="#">
              <span>{location}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Export Locations
export {Locations};
