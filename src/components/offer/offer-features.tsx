import { OfferType } from '../../types/offer';

type OfferFeaturesProps = {
  offer: OfferType;
}

function OfferFeatures({offer}: OfferFeaturesProps): JSX.Element {
  return (
    <ul className='offer__features'>
      <li className='offer__feature offer__feature--entire'>
        {offer.type}
      </li>
      <li className='offer__feature offer__feature--bedrooms'>
        {offer.bedrooms} Bedroom{offer.bedrooms === 1 ? '' : 's'}
      </li>
      <li className='offer__feature offer__feature--adults'>
        Max {offer.maxAdults} adult{offer.maxAdults === 1 ? '' : 's'}
      </li>
    </ul>
  );
}

export {OfferFeatures};
