// Import Components
import OfferMark from './offer-mark';
import OfferName from './offer-name';
import OfferRating from './offer-rating';
import OfferFeatures from './offer-features';
import OfferPrice from './offer-price';
import OfferInside from './offer-inside';
import OfferHost from './offer-host';
import Reviews from '../reviews/reviews';

// Import Types
import { OfferType } from '../../mocks/offer-mock';
import { CommentElementType } from '../../mocks/comments-mocks';

import {checkGoodOffer} from '../../utils';

// Create Offer
function Offer({offer, comments}: {offer: OfferType; comments: CommentElementType[]}): JSX.Element {
  return (
    <div className='offer__container container'>
      <div className='offer__wrapper'>
        {offer.isPremium && <OfferMark />}
        <OfferName offer={offer} />
        <OfferRating offer={offer} />
        <OfferFeatures offer={offer} />
        <OfferPrice offer={offer} />
        {checkGoodOffer(offer) && <OfferInside offer={offer} />}
        <OfferHost offer={offer} />

        <Reviews comments={comments} />
      </div>
    </div>
  );
}

// Export Offer
export default Offer;
