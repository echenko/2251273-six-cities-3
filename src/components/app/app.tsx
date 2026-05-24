import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GlobalStyle } from '../styles/styles-global';
import { MainPage } from '../../pages/main-page';
import { OfferPage } from '../../pages/offer-page';
import { LoginPage } from '../../pages/login-page';
import { FavoritesPage } from '../../pages/favorites-page';
import { Layout } from '../layout/layout';
import { Private } from '../private/private';
import { PageNotFound } from '../page-not-found/page-not-found';
import { AppRoute, PAGE_NOT_FOUND_MESSAGE } from '../../const';
import { getFavoriteOffers } from '../../utils';
import { COMMENTS } from '../../mocks/comments-mocks';
import { FAVORITES } from '../../mocks/favorite-mocks';
import { useAppSelector } from '../../hooks/hooks';
import { fetchOffersAction, checkAuthAction } from './../../store/api-actions';
import { store } from '../../store/store';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

function App(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const statusAuthorization = useAppSelector((state) => state.AuthorizationStatus);
  return (
    <HelmetProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <Layout />
            }
          >
            <Route
              index
              element={
                <MainPage/>
              }
            />
            <Route
              path={`${AppRoute.Offer}/:offerId`}
              element={
                <OfferPage
                  offers={offers}
                  comments={COMMENTS}
                  statusAuthorization={statusAuthorization}
                >
                  <PageNotFound message={PAGE_NOT_FOUND_MESSAGE.OFFER} />
                </OfferPage>
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
              <PageNotFound message={PAGE_NOT_FOUND_MESSAGE.PAGE} />
            }
          />
        </Routes>
      </BrowserRouter >
    </HelmetProvider>

  );
}

// Export App
export { App };
