// Import React
import { Link } from 'react-router-dom';
// Import Constants
import { AppRoute } from '../../const';

// Create Functions setStyle
function setStyle(location: string, city: string): string {
  return location.toLowerCase() === city.toLowerCase() ?
    'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item';
}

// Create Functions setCity
function setCity(location: string = 'all'): string {
  return location;
}

// Create Types
type LocationsItemProps = {
  location: string;
  city: string;
};

// Create LocationsItem
function LocationsItem({location, city}: LocationsItemProps): JSX.Element {
  return (
    <li className="locations__item" key={location}>
      <Link to={`${AppRoute.Main}?city=${setCity(location)}`} className={setStyle(location, city)}>
        <span>{location}</span>
      </Link>
    </li>
  );
}

// Export LocationsItem
export { LocationsItem };
