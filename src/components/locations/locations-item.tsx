// Import React
import { Link } from 'react-router-dom';
// Import Constants
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/hooks';
import { changeCity } from '../../store/action';
// Import Store
import { store } from '../../store/store';

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
};

// Create LocationsItem
function LocationsItem({location}: LocationsItemProps): JSX.Element {
  const {city} = store.getState();
  // Create Dispatch
  const dispatch = useAppDispatch();
  return (
    <li className="locations__item" key={location}>
      <Link
        to={`${AppRoute.Main}?city=${setCity(location)}`}
        className={setStyle(location, city)}
        onClick={() => dispatch(changeCity(location))}
      >
        <span>{location}</span>
      </Link>
    </li>
  );
}

// Export LocationsItem
export { LocationsItem };
