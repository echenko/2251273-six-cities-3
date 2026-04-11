// Import Types
import { OfferType } from '../../mocks/offers-mocks';
// Import Utils
import {getArrayAllCities } from '../../utils';

// Create Locations
function Locations({offers}: {offers: OfferType[]}): JSX.Element {
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
export default Locations;
