import { Link} from 'react-router-dom';
import { clsx } from 'clsx';
import { AppRoute, DEFAULT_CITY, DEFAULT_SORTING } from '../../const';
import { useAppDispatch } from '../../hooks/hooks';
import { changeCity, changeSorting } from '../../store/action';
import { checkAuthAction } from '../../store/api-actions';
import { useCallback,memo } from 'react';

type LogoProps = {
  logoState: boolean;
}

function Logo({logoState}: LogoProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    dispatch(changeCity(DEFAULT_CITY));
    dispatch(changeSorting(DEFAULT_SORTING));
    dispatch(checkAuthAction());
  }, [dispatch]);


  return (
    <Link to={AppRoute.Main}
      className={clsx('header__logo-link', { 'header__logo-link--active': logoState })}
      onClick={handleClick}
    >
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </Link>
  );
}

const LogoMemo = memo(Logo);

export { LogoMemo as Logo };
