import { useState } from 'react';
import { CitiesPlaces } from './cities-places';
import { Map } from '../map/map';
import { getLocation } from '../../utils';
import { OffersElementType } from '../../types/offers';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchOffersAction } from '../../store/api-actions';

type CitiesProps = {
  offers: OffersElementType[];
  city: string;
}

function Cities({offers, city}: CitiesProps): JSX.Element {
  const [currentOffer, setCurrentOffer] = useState<string>('');
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
        <CitiesPlaces
          offers={offers}
          city={city}
          onOfferHover={handleOfferHover}
        />
        <div className="cities__right-section">
          <Map
            className="cities__map"
            offers={offers}
            location={getLocation(offers[0])}
            currentOffer={currentOffer}
          />
        </div>
      </div>
    </div>
  );
}

export {Cities};
