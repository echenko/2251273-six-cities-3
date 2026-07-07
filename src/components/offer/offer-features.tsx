<<<<<<< HEAD
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
=======
// Create OfferFeatures
function OfferFeatures(): JSX.Element {
  return (
    <ul className='offer__features'>
      {/* TODO: Доработать! */}
      <li className='offer__feature offer__feature--entire'>
        Apartment
      </li>
      <li className='offer__feature offer__feature--bedrooms'>
        3 Bedrooms
      </li>
      <li className='offer__feature offer__feature--adults'>
        Max 4 adults
>>>>>>> 6b372f6 (add: components offer-page)
      </li>
    </ul>
  );
}

<<<<<<< HEAD
export {OfferFeatures};
=======
// Export OfferFeatures
export default OfferFeatures;
>>>>>>> 6b372f6 (add: components offer-page)
