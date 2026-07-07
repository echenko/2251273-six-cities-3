import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { OfferGallery } from '../components/offer/offer-gallery';
import { Offer } from '../components/offer/offer';
import { NearPlaces } from '../components/offer/offer-places';
import { Map } from '../components/map/map';
import { getLocation, getRandomNearsOffers } from '../utils';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { fetchOfferAction, fetchNearOffersAction } from '../store/api-actions';
import { AppRoute, TYPE_OF_ERROR } from '../const';
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
  const [currentOffer, setCurrentOffer] = useState<string>(`${offerId}`);
  const [randomNearsOffers, setRandomNearsOffers] = useState<OffersElementType[]>([]);
  const navigation = useNavigate();

  const handleOfferHover = () => {
    setCurrentOffer(`${offerId}`);
  };

  useEffect(() => {
    dispatch(fetchOfferAction(offerId)).unwrap().then(() => {
      dispatch(fetchNearOffersAction(offerId));
      setCurrentOffer(`${offerId}`);
    }).catch(() => {
      navigation(AppRoute.NotFound);
    });
  }, [dispatch, offerId, navigation]);
  useEffect(() => {
    setRandomNearsOffers(getRandomNearsOffers(nearOffers));
  }, [nearOffers]);

  useEffect(() => {
    if (!selectedOfferLoadingStatus) {
      dispatch(setErrorType(TYPE_OF_ERROR.ERROR_LOADING_OFFER));
    }
  }, [selectedOfferLoadingStatus, dispatch]);

  return (
    <main className='page__main page__main--offer'>
      <section className='offer'>
        {selectedOffer && <OfferGallery offer={selectedOffer} />}
        {selectedOffer && <Offer offer={selectedOffer} />}
        {selectedOffer &&
          <Map
            className="offer__map"
            offers={randomNearsOffers.concat({
              ...selectedOffer,
              previewImage: selectedOffer.images[0],
            })}
            location={getLocation(selectedOffer)}
            currentOffer={currentOffer}
            isActiveMarker={false}
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
