// Import React
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// Import Components
import { OfferGallery } from '../components/offer/offer-gallery';
import { Offer } from '../components/offer/offer';
import { NearPlaces } from '../components/offer/offer-places';
import { Map } from '../components/map/map';
// Import Constants
// import { AuthorizationStatus } from '../const';
// Import Utils
import { getLocation } from '../utils';
// Import Types
import { OffersElementType } from '../types/offers';
import { useAppSelector } from '../hooks/hooks';
import { useAppDispatch } from '../hooks/hooks';
import { fetchOfferAction } from '../store/api-actions';

// Create Types
type OfferPageProps = {
  children: JSX.Element;
}

// Create OfferPage
function OfferPage({
  children,
}: OfferPageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const offerId: string = useParams().offerId || '';
  const offer = useAppSelector((state) => state.currentOffer);
  const offers = useAppSelector((state) => state.offers);

  // const comments = useAppSelector((state) => state.comments);
  // const statusAuthorization = useAppSelector((state) => state.AuthorizationStatus);

  useEffect(() => {
    dispatch(fetchOfferAction(offerId));
  }, [dispatch, offerId]);

  const [currentOffer, setCurrentOffer] = useState<string>('');

  const activeOffer: OffersElementType = offers.find((item) => item.id === offerId)!;
  // const NEAREST_OFFERS: OffersElementType[] = getNearestOffers(offers, activeOffer);

  const handleOfferHover = (idOffer: string) => {
    setCurrentOffer(idOffer);
  };

  return (
    <main className='page__main page__main--offer'>
      <section className='offer'>
        {offer && <OfferGallery offer={offer} />}
        {offer && <Offer offer={offer}/>}
        <Map
          className="offer__map"
          offers={offers}
          location={getLocation(activeOffer)}
          currentOffer={currentOffer}
        />
      </section>
      <div className='container'>
        <NearPlaces
          offers={offers}
          onOfferHover={handleOfferHover}
        />
      </div>
    </main>
  );

}

// Export OffersPage
export { OfferPage };
