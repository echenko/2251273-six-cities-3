// Import Constants
import { LOCATIONS } from '../../const';

// Create Locations
function Locations(): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {LOCATIONS.map((location) => (
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
