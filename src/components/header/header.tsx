// Import Components
import Logo from '../logo/logo';
import Navigation from '../navigation/navigation';

// Import Types
import {OffersElementType} from '../../mocks/offers-mocks';

// Create Header
function Header({offers}: {offers: OffersElementType[]}): JSX.Element {

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <Navigation offers={offers} />
        </div>
      </div>
    </header>
  );
}

// Export Header
export default Header;
