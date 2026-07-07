<<<<<<< HEAD
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
import { AppRoute } from '../../const';
import { getAuthCheckedStatus } from '../../store/selectors/user-selector';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { useEffect } from 'react';
import { checkAuthAction } from '../../store/api-actions';
=======
// Import Components Pages
import MainPage from '../../pages/main-page';
import OffersPage from '../../pages/offers-page';
>>>>>>> 6b372f6 (add: components offer-page)

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);

  useEffect(() => {
    if (!isAuthChecked) {
      dispatch(checkAuthAction());
    }
  }, [dispatch, isAuthChecked]);

  return (
<<<<<<< HEAD
    <HelmetProvider>
      <GlobalStyle />
      < BrowserRouter>
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
                <MainPage />
              }
            />
            <Route
              path={`${AppRoute.Offer}/:offerId`}
              element={
                <OfferPage />
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
                <Private>
                  <FavoritesPage />
                </Private>
              }
            />
            <Route
              path={AppRoute.NotFound}
              element={
                <PageNotFound />
              }
            />
          </Route>
        </Routes>
      </ BrowserRouter>
    </HelmetProvider>

=======
    <>
      <MainPage />
      <OffersPage />
    </>
>>>>>>> 6b372f6 (add: components offer-page)
  );
}

export { App };
