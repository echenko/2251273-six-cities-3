// Import React
import { Outlet, useLocation } from 'react-router-dom';
// Import Components
import { Logo } from './logo/logo';
import { Navigation } from './navigation/navigation';
// Import Constants
import { AppRoute } from '../const';
// Import Types
import { OffersElementType } from '../mocks/offers-mocks';

// Create Types
type LayoutState = {
  classNamePage: string;
  navigationState: boolean;
  logoState: boolean;
}

// Get Layout State
const getLayoutState = (pathname: AppRoute): LayoutState => {
  switch (pathname) {
    case AppRoute.Main:
      return {
        classNamePage: 'page page--gray page--main',
        navigationState : true,
        logoState : true,
      };
    case AppRoute.Offer:
      return {
        classNamePage: 'page',
        // TODO: Correct to true!
        navigationState : false,
        logoState : false,
      };
    case AppRoute.Login:
      return {
        classNamePage: 'page--gray page--login',
        navigationState : false,
        logoState : false,
      };
    case AppRoute.Favorites:
      return {
        classNamePage: 'page',
        navigationState : true,
        logoState : false,
      };
    default:
      return {
        classNamePage: 'page',
        navigationState : false,
        logoState : false,
      };
  }
};

// Create Types
type LayoutProps = {
  offers: OffersElementType[];
}

// Create Layout
function Layout({ offers }: LayoutProps): JSX.Element {
  const { pathname } = useLocation();
  const { classNamePage, navigationState, logoState } = getLayoutState(pathname as AppRoute);

  return (
    <div className={classNamePage}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo logoState={logoState} />
            </div>
            {navigationState && <Navigation offers={offers} />}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

// Export Layout
export { Layout };
