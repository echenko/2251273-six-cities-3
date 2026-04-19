// Import Components
import { OfferGallery } from '../components/offer/offer-gallery';
import { Offer } from '../components/offer/offer';
import { OfferMap } from '../components/offer/offer-map';
import { NearPlaces } from '../components/offer/offer-places';
// Import Types
import { OffersElementType } from '../mocks/offers-mocks';
import { OFFER, OfferType } from '../mocks/offer-mock';
import { CommentElementType } from '../mocks/comments-mocks';
// Import Constants
import { AuthorizationStatus } from '../const';

// Create Types
type OfferPageProps = {
  offers: OffersElementType[];
  comments: CommentElementType[];
  statusAuthorization: AuthorizationStatus;
}

// Create OfferPage
function OfferPage({
  offers,
  comments,
  statusAuthorization
}: OfferPageProps): JSX.Element {
  const offer: OfferType = OFFER;

  return (
    <main className='page__main page__main--offer'>
      <section className='offer'>
        <OfferGallery offer={offer} />
        <Offer offer={offer} comments={comments} statusAuthorization={statusAuthorization} />
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
