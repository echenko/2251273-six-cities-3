import { useEffect, useState, useCallback } from 'react';
import { CitiesPlaces } from './cities-places';
import { Map } from '../map/map';
import { Message } from '../message/message';
import { getLocation } from '../../utils';
import { OffersElementType } from '../../types/offers';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { SYSTEM_MESSAGE, TYPE_OF_ERROR } from '../../const';
import { MainEmpty } from '../main-empty/main-empty';
import { clsx } from 'clsx';
import { setErrorType } from '../../store/action';
import { checkErrorEmptyOffers } from '../../store/selectors/error-slice';
import { getOffersLoadingStatus } from '../../store/selectors/offers-slice';

type CitiesProps = {
  offers: OffersElementType[];
  city: string;
}

function Cities({ offers, city }: CitiesProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [currentOffer, setCurrentOffer] = useState<string>('');
  const checkEmptyOffers = useAppSelector(checkErrorEmptyOffers);
  const offersLoadingStatus = useAppSelector(getOffersLoadingStatus);

  const handleOfferHover = useCallback((offerId: string) => {
    setCurrentOffer(offerId);
  }, []);

  useEffect(() => {
    if (offers.length === 0 && offersLoadingStatus !== null) {
      dispatch(setErrorType(TYPE_OF_ERROR.ERROR_EMPTY_OFFERS));
    } else {
      dispatch(setErrorType(null));
    }
  }, [offers, dispatch, offersLoadingStatus]);

  return (
    <div className="cities">
      {!offersLoadingStatus &&
        <Message
          message={
            offersLoadingStatus === false ? SYSTEM_MESSAGE.ERROR_LOADING_OFFERS : SYSTEM_MESSAGE.UPLOADING_OFFERS
          }
        />}

      {offersLoadingStatus &&
      <div
        className={clsx('cities__places-container container', { 'cities__places-container--empty': checkEmptyOffers })}
      >
        {checkEmptyOffers && <MainEmpty />}
        {!!offers.length &&
          <CitiesPlaces
            offers={offers}
            city={city}
            onOfferHover={handleOfferHover}
          />}
        <div className="cities__right-section">
          {!!offers.length &&
            <Map
              className="cities__map"
              offers={offers}
              location={getLocation(offers[0])}
              currentOffer={currentOffer}
            />}
        </div>
      </div>}
    </div>
  );
}

export { Cities };
