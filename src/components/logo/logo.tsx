// Import React
import {Link} from 'react-router-dom';

// Import Constants
import {AppRoute} from '../../const';

// Create Logo
function Logo(): JSX.Element {
  return (
    <Link to={AppRoute.Main} className="header__logo-link header__logo-link--active">
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </Link>
  );
}

// Export Logo
export {Logo};
