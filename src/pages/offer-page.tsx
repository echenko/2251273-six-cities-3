// Import React
import { useParams } from 'react-router-dom';
import { useState } from 'react';
// Import Components
import { OfferGallery } from '../components/offer/offer-gallery';
import { Offer } from '../components/offer/offer';
import { NearPlaces } from '../components/offer/offer-places';
import { Map } from '../components/map/map';
// Import Constants
import { AuthorizationStatus } from '../const';
// Import Utils
import { checkOfferId, getLocation, getNearestOffers } from '../utils';
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
  const [currentOffer, setCurrentOffer] = useState<string>('');


  if (!checkOfferId(offers, offerId)) {
    return children;
  }

  const activeOffer: OffersElementType = offers.find((item) => item.id === offerId)!;
  const NEAREST_OFFERS: OffersElementType[] = getNearestOffers(offers, activeOffer);

  const handleOfferHover = (idOffer: string) => {
    setCurrentOffer(idOffer);
  };

  return (
    <main className='page__main page__main--offer'>
      <section className='offer'>
        <OfferGallery offer={offer} />
        <Offer offer={offer} comments={comments} statusAuthorization={statusAuthorization} />
        <Map
          className="offer__map"
          offers={NEAREST_OFFERS}
          location={getLocation(activeOffer)}
          currentOffer={currentOffer}
        />
      </section>
      <div className='container'>
        <NearPlaces
          offers={NEAREST_OFFERS}
          onOfferHover={handleOfferHover}
        />
      </div>
    </main>
  );

}

// Export OffersPage
export { OfferPage };
