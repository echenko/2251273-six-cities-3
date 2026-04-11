// Import Types
import { OfferType } from '../../mocks/offer-mock';

import {convertRatingToStars} from '../../utils';

// Create OfferRating
function OfferRating({offer}: {offer: OfferType}): JSX.Element {
  return (
    <div className='offer__rating rating'>
      <div className='offer__stars rating__stars'>
        <span style={{ width: convertRatingToStars(offer.rating)}}></span>
        <span className='visually-hidden'>Rating</span>
      </div>
      <span className='offer__rating-value rating__value'>{offer.rating}</span>
    </div>
  );
}

// Export OfferRating
export default OfferRating;
