import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { AppRoute, DEFAULT_SORTING } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changeCity, changeSorting } from '../../store/action';
import { getSelectedCity } from '../../store/selectors/city-slice';
import React from 'react';

type LocationsItemProps = {
  location: string;
};

const LocationsItem = React.memo(({ location }: LocationsItemProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const city = useAppSelector(getSelectedCity) ?? '';

  const handleClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(changeCity(location));
    dispatch(changeSorting(DEFAULT_SORTING));
    navigate(AppRoute.Main);
  };

  return (
    <li className="locations__item">
      <a
        href="#"
        className={clsx(
          'locations__item-link tabs__item',
          { 'tabs__item--active': location.toLowerCase() === city.toLowerCase() }
        )}
        onClick={handleClick}
      >
        <span>{location}</span>
      </a>
    </li>
  );
});

LocationsItem.displayName = 'LocationsItem';

export { LocationsItem };
