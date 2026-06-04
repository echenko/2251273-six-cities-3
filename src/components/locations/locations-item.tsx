// Import React
import { Link } from 'react-router-dom';
// Import Utils
import { clsx } from 'clsx';
// Import Constants
import { AppRoute } from '../../const';
// Import Hooks
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
// Import Actions
import { changeCity, resetSorting } from '../../store/action';

// Create Types
type LocationsItemProps = {
  location: string;
};

function LocationsItem({location}: LocationsItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.CITY.SelectedCity);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
    event.preventDefault();
    dispatch(changeCity(location));
    dispatch(resetSorting());
  }

  return (
    <li className="locations__item">
      <Link
        to={AppRoute.Main}
        className={clsx(
          'locations__item-link tabs__item',
          { 'tabs__item--active': location.toLowerCase() === city.toLowerCase() }
        )}
        onClick={handleClick}
      >
        <span >{location}</span>
      </Link>
    </li>
  );
}

// Export LocationsItem
export { LocationsItem };
