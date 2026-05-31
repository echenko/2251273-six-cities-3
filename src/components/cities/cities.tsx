import { useState } from 'react';
import { CitiesPlaces } from './cities-places';
import { Map } from '../map/map';
import { Message } from '../message/message';
import { getLocation } from '../../utils';
import { OffersElementType } from '../../types/offers';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchOffersAction } from '../../store/api-actions';
import { useAppSelector } from '../../hooks/hooks';
import { SYSTEM_MESSAGE } from '../../const';

type CitiesProps = {
  offers: OffersElementType[];
  city: string;
}

function Cities({ offers, city }: CitiesProps): JSX.Element {
  const [currentOffer, setCurrentOffer] = useState<string>('');
  const offersLoadingStatus = useAppSelector((state) => state.offersLoadingStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  const handleOfferHover = (offerId: string) => {
    setCurrentOffer(offerId);
  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        {!offersLoadingStatus &&
          <Message
            message={
              offersLoadingStatus === false ? SYSTEM_MESSAGE.ERROR_LOADING_OFFERS : SYSTEM_MESSAGE.UPLOADING_OFFERS
            }
          />}
        {offersLoadingStatus &&
          <CitiesPlaces
            offers={offers}
            city={city}
            onOfferHover={handleOfferHover}
          />}
        <div className="cities__right-section">
          {offersLoadingStatus &&
          <Map
            className="cities__map"
            offers={offers}
            location={getLocation(offers[0])}
            currentOffer={currentOffer}
          />}
        </div>
      </div>
    </div>
  );
}

export { Cities };
