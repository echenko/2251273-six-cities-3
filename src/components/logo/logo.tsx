// Import React
import { Link} from 'react-router-dom';
// Import Utils
import { clsx } from 'clsx';
// Import Constants
import { AppRoute } from '../../const';
// Import Hooks
import { useAppDispatch } from '../../hooks/hooks';
// Import Actions
import { resetCity } from '../../store/action';

// Create Types
type LogoProps = {
  logoState: boolean;
}

// Create Logo
function Logo({logoState}: LogoProps): JSX.Element {
  // Create Dispatch
  const dispatch = useAppDispatch();

  // Create handleClick
  function handleClick(): void {
    dispatch(resetCity());
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

// Export Logo
export {Logo};
