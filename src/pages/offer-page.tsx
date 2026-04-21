// Import React
import { useParams } from 'react-router-dom';
// Import Components
import { OfferGallery } from '../components/offer/offer-gallery';
import { Offer } from '../components/offer/offer';
import { OfferMap } from '../components/offer/offer-map';
import { NearPlaces } from '../components/offer/offer-places';
// Import Constants
import { AuthorizationStatus } from '../const';
// Import Utils
import { checkOfferId } from '../utils';
// Import Types
import { OffersElementType } from '../mocks/offers-mocks';
import { OFFER, OfferType } from '../mocks/offer-mock';
import { CommentElementType } from '../mocks/comments-mocks';

// Create Types
type OfferPageProps = {
  offers: OffersElementType[];
  comments: CommentElementType[];
  statusAuthorization: AuthorizationStatus;
  children: JSX.Element;
}

// Create OfferPage
function OfferPage({
  offers,
  comments,
  statusAuthorization,
  children,
}: OfferPageProps): JSX.Element {
  // TODO: Доработать!
  const offer: OfferType = OFFER;
  const offerId: string = useParams().offerId || '';


  if (!checkOfferId(offers, offerId)) {
    return children;
  }

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
