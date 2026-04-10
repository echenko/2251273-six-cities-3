// Import Components
import Logo from '../logo/logo';
import Navigation from '../navigation/navigation';

// Create Header
function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <Navigation />
        </div>
      </div>
    </header>
  );
}

// Export Header
export default Header;
