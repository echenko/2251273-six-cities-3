// Import React
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// Import Styles
import { createGlobalStyle } from 'styled-components';
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
import { OffersElementType, OFFERS } from '../../mocks/offers-mocks';
import { COMMENTS } from '../../mocks/comments-mocks';
import { FAVORITES } from '../../mocks/favorite-mocks';

// Create GlobalStyle
// TODO: Create GlobalStyle!
export const GlobalStyle = createGlobalStyle`
  body,
  html {
    width: auto;
    margin: 0;
  }

  html {
    margin-left: calc(100vw - 100%);
  }
  `;

// Create App
function App(): JSX.Element {
  const offers: OffersElementType[] = OFFERS;
  const statusAuthorization = getStatusAuth();
  return (
    <HelmetProvider>
      <GlobalStyle />
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
                  comments={COMMENTS}
                  statusAuthorization={statusAuthorization}
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
                  statusAuthorization={statusAuthorization}
                >
                  <FavoritesPage favoritesOffers={getFavoriteOffers(FAVORITES)} />
                </Private>
              }
            />
          </Route>
          {/* TODO: Add 404! */}
          <Route
            path={AppRoute.NotFound}
            element={
              <><h1>Page not found</h1><a href={AppRoute.Main}>Go to main page</a></>
            }
          />
        </Routes>
      </BrowserRouter >
    </HelmetProvider>

  );
}

// Export App
export { App };
