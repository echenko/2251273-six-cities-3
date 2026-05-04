// Import React
import { useState } from 'react';
// Import Components
import {CitiesPlaces} from './cities-places';
import {Map} from '../map/map';
// Import Utils
import { getLocation } from '../../utils';
// Import Types
import {OffersElementType} from '../../mocks/offers-mocks';

// Create Types
type CitiesProps = {
  offers: OffersElementType[];
  city: string;
}

// Create Cities
function Cities({offers, city}: CitiesProps): JSX.Element {
  const [currentOffer, setCurrentOffer] = useState<string>('');

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

// Export Cities
export {Cities};
