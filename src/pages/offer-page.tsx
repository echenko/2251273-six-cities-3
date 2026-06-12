import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { OfferGallery } from '../components/offer/offer-gallery';
import { Offer } from '../components/offer/offer';
import { NearPlaces } from '../components/offer/offer-places';
import { Map } from '../components/map/map';
import { Message } from '../components/message/message';
import { getLocation, getRandomNearsOffers } from '../utils';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { fetchOfferAction, fetchNearOffersAction } from '../store/api-actions';
import { TYPE_OF_ERROR } from '../const';
import { getSelectedOfferLoadingStatus, getSelectedOffer } from '../store/selectors/offer-slice';
import { getNearOffers } from '../store/selectors/offers-slice';
import { OffersElementType } from '../types/offers';
import { setErrorType } from '../store/action';

function OfferPage(): JSX.Element {

  const dispatch = useAppDispatch();
  const { offerId } = useParams<{ offerId: string }>();
  const selectedOffer = useAppSelector(getSelectedOffer);
  const nearOffers = useAppSelector(getNearOffers);
  const selectedOfferLoadingStatus = useAppSelector(getSelectedOfferLoadingStatus);
  const [currentOffer, setCurrentOffer] = useState<string>('');
  const [randomNearsOffers, setRandomNearsOffers] = useState<OffersElementType[]>([]);

  const handleOfferHover = (idOffer: string) => {
    setCurrentOffer(idOffer);
  };

  useEffect(() => {
    dispatch(fetchOfferAction(offerId));
    dispatch(fetchNearOffersAction(offerId));
  }, [dispatch, offerId]);

  useEffect(() => {
    setRandomNearsOffers(getRandomNearsOffers(nearOffers));
  }, [nearOffers]);

  useEffect(() => {
    if (selectedOfferLoadingStatus === false) {
      dispatch(setErrorType(TYPE_OF_ERROR.ERROR_LOADING_OFFER));
    }
  }, [selectedOfferLoadingStatus, dispatch]);


  return (
    <main className='page__main page__main--offer'>
      <section className='offer'>
        {!selectedOfferLoadingStatus && <Message />}
        {selectedOffer && <OfferGallery offer={selectedOffer}/>}
        {selectedOffer && <Offer offer={selectedOffer}/>}
        {selectedOffer &&
        <Map
          className="offer__map"
          offers={randomNearsOffers}
          location={getLocation(selectedOffer)}
          currentOffer={currentOffer}
        />}
      </section>
      <div className='container'>
        {selectedOffer &&
        <NearPlaces
          offers={randomNearsOffers}
          onOfferHover={handleOfferHover}
        />}
      </div>
    </main>
  );
}

export { OfferPage };
