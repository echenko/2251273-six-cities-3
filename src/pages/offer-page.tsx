// Import Components
import Header from '../components/header/header';
import OfferGallery from '../components/offer/offer-gallery';
import Offer from '../components/offer/offer';
import OfferMap from '../components/offer/offer-map';
import NearPlaces from '../components/offer/offer-places';

// Import Types
import { OffersElementType } from '../mocks/offers-mocks';
import { OfferType } from '../mocks/offer-mock';
import { CommentElementType } from '../mocks/comments-mocks';

// Create OfferPage
function OfferPage({
  offers,
  offer,
  comments
} : {
  offers: OffersElementType[];
  offer: OfferType;
  comments: CommentElementType[];
}): JSX.Element {

  return (
    <div className='page'>
      <Header offers={offers} />

      <main className='page__main page__main--offer'>
        <section className='offer'>
          <OfferGallery offer={offer} />
          <Offer offer={offer} comments={comments} />
          <OfferMap />
        </section>
        <div className='container'>
          <NearPlaces offers={offers} />
        </div>
      </main>
    </div>
  );
}

// Export OffersPage
export default OfferPage;
