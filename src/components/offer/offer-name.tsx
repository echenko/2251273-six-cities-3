<<<<<<< HEAD
import { OfferBookmark } from './offer-bookmark';
import { OfferType } from '../../types/offer';

type OfferNameProps = {
  offer: OfferType;
}

function OfferName({offer}: OfferNameProps): JSX.Element {
  return (
    <div className='offer__name-wrapper'>
      <h1 className='offer__name'>
        {offer.title}
      </h1>
      <OfferBookmark offer={offer} />
=======
// Import Components
import OfferBookmark from './offer-bookmark';

// Create OfferName
function OfferName(): JSX.Element {
  return (
    <div className='offer__name-wrapper'>
      <h1 className='offer__name'>
        Beautiful &amp; luxurious studio at great location
      </h1>
      <OfferBookmark />
>>>>>>> 6b372f6 (add: components offer-page)
    </div>
  );
}

<<<<<<< HEAD
export {OfferName};
=======
// Export OfferName
export default OfferName;
>>>>>>> 6b372f6 (add: components offer-page)
