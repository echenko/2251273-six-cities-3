import { Link} from 'react-router-dom';
import { clsx } from 'clsx';
import { AppRoute, DEFAULT_CITY, DEFAULT_SORTING } from '../../const';
import { useAppDispatch } from '../../hooks/hooks';
import { changeCity, changeSorting } from '../../store/action';

type LogoProps = {
  logoState: boolean;
}

function Logo({logoState}: LogoProps): JSX.Element {
  const dispatch = useAppDispatch();

  function handleClick(): void {
    dispatch(changeCity(DEFAULT_CITY));
    dispatch(changeSorting(DEFAULT_SORTING));
  }

  return (
    <Link to={AppRoute.Main}
      className={clsx('header__logo-link', { 'header__logo-link--active': logoState })}
      onClick={handleClick}
    >
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </Link>
  );
}

export {Logo};
