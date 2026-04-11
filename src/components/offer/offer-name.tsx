// Import Components
import OfferBookmark from './offer-bookmark';

// Import Types
import { OfferType } from '../../mocks/offer-mock';

// Create OfferName
function OfferName({offer}: {offer: OfferType}): JSX.Element {
  return (
    <div className='offer__name-wrapper'>
      <h1 className='offer__name'>
        {offer.title}
      </h1>
      <OfferBookmark offer={offer} />
    </div>
  );
}

// Export OfferName
export default OfferName;
