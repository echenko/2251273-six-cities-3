import { useEffect, useState } from 'react';
import { CitiesPlaces } from './cities-places';
import { Map } from '../map/map';
import { Message } from '../message/message';
import { getLocation } from '../../utils';
import { OffersElementType } from '../../types/offers';
import { useAppSelector } from '../../hooks/hooks';
import { SYSTEM_MESSAGE } from '../../const';
import { useCallback } from 'react';
import { MainEmpty } from '../main-empty/main-empty';
import { clsx } from 'clsx';
import { useAppDispatch } from '../../hooks/hooks';
import { setErrorType } from '../../store/action';
import { TYPE_OF_ERROR } from '../../const';
import { checkErrorEmptyOffers } from '../../store/selectors/error-slice';

type CitiesProps = {
  offers: OffersElementType[];
  city: string;
}

function Cities({ offers, city }: CitiesProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [currentOffer, setCurrentOffer] = useState<string>('');
  const offersLoadingStatus = useAppSelector((state) => state.OFFERS.offersLoadingStatus);
  const checkEmptyOffers = useAppSelector(checkErrorEmptyOffers);

  const handleOfferHover = useCallback((offerId: string) => {
    setCurrentOffer(offerId);
  }, []);

  useEffect(() => {
    if(offers.length === 0) {
      dispatch(setErrorType(TYPE_OF_ERROR.EMPTY_OFFERS));
    } else {
      dispatch(setErrorType(null));
    }

  }, [offers, dispatch]);

  return (
    <div className="cities">
      <div
        className={clsx('cities__places-container container', {'cities__places-container--empty': checkEmptyOffers})}
      >
        {!offersLoadingStatus &&
          <Message
            message={
              offersLoadingStatus === false ? SYSTEM_MESSAGE.ERROR_LOADING_OFFERS : SYSTEM_MESSAGE.UPLOADING_OFFERS
            }
          />}
        {checkEmptyOffers && <MainEmpty />}
        {offersLoadingStatus && !checkEmptyOffers &&
          <CitiesPlaces
            offers={offers}
            city={city}
            onOfferHover={handleOfferHover}
          />}
        <div className="cities__right-section">
          {offersLoadingStatus && !checkEmptyOffers &&
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
