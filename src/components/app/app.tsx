// Import React
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Import Components Pages
import { MainPage } from '../../pages/main-page';
import { OfferPage } from '../../pages/offer-page';
import { Layout } from '../layout';
// Import Types
import { OffersElementType } from '../../mocks/offers-mocks';
import { OFFER } from '../../mocks/offer-mock';
import { COMMENTS } from '../../mocks/comments-mocks';
// Import Constants
import { AppRoute } from '../../const';

// Create Types
type AppProps = {
  offers: OffersElementType[];
};

// Create App
function App({ offers }: AppProps): JSX.Element {
  return (
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
            path={AppRoute.Offer}
            element={
              <OfferPage
                offers={offers}
                offer={OFFER}
                comments={COMMENTS}
              />
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
    </BrowserRouter>

  );
}

// Export App
export { App };
