// Import React
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// Import Components Pages
import { MainPage } from '../../pages/main-page';
import { OfferPage } from '../../pages/offer-page';
import { LoginPage } from '../../pages/login-page';
import { FavoritesPage } from '../../pages/favorites-page';
// Import Components
import { Layout } from '../layout/layout';
import { Private } from '../private/private';
// Import Constants
import { AppRoute } from '../../const';
// Import Utils
import { getStatusAuth, getFavoriteOffers } from '../../utils';
// Import Types
import { OffersElementType } from '../../mocks/offers-mocks';
import { OFFER } from '../../mocks/offer-mock';
import { COMMENTS } from '../../mocks/comments-mocks';
import { FAVORITES } from '../../mocks/favorite-mocks';

// Create Types
type AppProps = {
  offers: OffersElementType[];
};

// Create App
function App({ offers }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <Layout offers={offers} />
            }
          >
            <Route
              index
              element={
                <MainPage
                  offers={offers}
                />
              }
            />
            <Route
              path={`${AppRoute.Offer}/:id`}
              element={
                <OfferPage
                  offers={offers}
                  offer={OFFER}
                  comments={COMMENTS}
                />
              }
            />
            <Route
              path={AppRoute.Login}
              element={
                <LoginPage />
              }
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <Private
                  statusAuthorization={getStatusAuth()}
                >
                  <FavoritesPage favoritesOffers={getFavoriteOffers(FAVORITES)} />
                </Private>
              }
            />
            {/* TODO: Add 404! */}
            <Route
              path={AppRoute.NotFound}
              element={
                <><h1>Page not found</h1><a href={AppRoute.Main}>Go to main page</a></>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter >
    </HelmetProvider>

  );
}

// Export App
export { App };
