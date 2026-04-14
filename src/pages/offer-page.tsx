// Import Components
import { OfferGallery } from '../components/offer/offer-gallery';
import { Offer } from '../components/offer/offer';
import OfferMap from '../components/offer/offer-map';
import NearPlaces from '../components/offer/offer-places';

// Import Types
import { OffersElementType } from '../mocks/offers-mocks';
import { OfferType } from '../mocks/offer-mock';
import { CommentElementType } from '../mocks/comments-mocks';

// Create Types
type OfferPageProps = {
  offers: OffersElementType[];
  offer: OfferType;
  comments: CommentElementType[];
}

// Create OfferPage
function OfferPage({
  offers,
  offer,
  comments
}: OfferPageProps): JSX.Element {

  return (
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
  );
}

// Export OffersPage
export { OfferPage };
