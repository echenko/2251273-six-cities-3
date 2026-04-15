// Import React
import { Link} from 'react-router-dom';
// Import Constants
import { AppRoute } from '../../const';

// Create Types
type LogoProps = {
  logoState: boolean;
}

// Create Logo
function Logo({logoState}: LogoProps): JSX.Element {
  return (
    <Link to={AppRoute.Main} className={`header__logo-link ${logoState ? 'header__logo-link--active' : ''}`}>
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </Link>
  );
}

// Export Logo
export {Logo};
