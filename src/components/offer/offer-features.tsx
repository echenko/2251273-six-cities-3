// Import Types
import {OfferType} from '../../mocks/offer-mock';

// Create Types
type OfferFeaturesProps = {
  offer: OfferType;
}

// Create OfferFeatures
function OfferFeatures({offer}: OfferFeaturesProps): JSX.Element {
  return (
    <ul className='offer__features'>
      <li className='offer__feature offer__feature--entire'>
        {offer.type}
      </li>
      <li className='offer__feature offer__feature--bedrooms'>
        {offer.bedrooms} Bedrooms
      </li>
      <li className='offer__feature offer__feature--adults'>
        Max {offer.maxAdults} adult{offer.maxAdults === 1 ? '' : 's'}
      </li>
    </ul>
  );
}

// Export OfferFeatures
export {OfferFeatures};
