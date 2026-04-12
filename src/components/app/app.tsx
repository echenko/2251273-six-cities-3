// Import Components Pages
// TODO: Исправить!
import {MainPage} from '../../pages/main-page';
import {OfferPage} from '../../pages/offer-page';
// Import Types
import {OffersElementType} from '../../mocks/offers-mocks';
import { OFFER } from '../../mocks/offer-mock';
import { COMMENTS } from '../../mocks/comments-mocks';

// Create Types
type AppProps = {
  offers: OffersElementType[];
};

// Create App
function App({offers}: AppProps): JSX.Element {
  return (
    <>
      {/* TODO: Исправить! */}
      <MainPage
        offers={offers}
      />
      <OfferPage
        offers={offers}
        offer={OFFER}
        comments={COMMENTS}
      />
    </>
  );
}

// Export App
export {App};
