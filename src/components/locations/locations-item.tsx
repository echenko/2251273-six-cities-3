import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changeCity, changeSorting } from '../../store/action';
import { DEFAULT_SORTING } from '../../const';

type LocationsItemProps = {
  location: string;
};

function LocationsItem({location}: LocationsItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.CITY.SelectedCity);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
    event.preventDefault();
    dispatch(changeCity(location));
    dispatch(changeSorting(DEFAULT_SORTING));
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

export { LocationsItem };
