import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { memo, useCallback, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { changeCity, changeSorting, setErrorType } from '../../store/action';
import { AppRoute, DEFAULT_CITY, DEFAULT_SORTING } from '../../const';
import { checkAuthAction } from '../../store/api-actions';

type LogoProps = {
  logoState: boolean;
};

export const Logo = memo(({ logoState }: LogoProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    dispatch(changeCity(DEFAULT_CITY));
    dispatch(changeSorting(DEFAULT_SORTING));
    dispatch(setErrorType(null));
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  return (
    <Link
      to={AppRoute.Main}
      className={clsx('header__logo-link', {
        'header__logo-link--active': logoState,
      })}
      onClick={handleClick}
    >
      <img
        className="header__logo"
        src="img/logo.svg"
        alt="6 cities logo"
        width="81"
        height="41"
      />
    </Link>
  );
});

Logo.displayName = 'Logo';
