// Import Components
import {OfferMark} from './offer-mark';
import {OfferName} from './offer-name';
import {OfferRating} from './offer-rating';
import {OfferFeatures} from './offer-features';
import {OfferPrice} from './offer-price';
import {OfferInside} from './offer-inside';
import {OfferHost} from './offer-host';
import {Reviews} from '../reviews/reviews';
// Import Utils
import {checkGoodOffer} from '../../utils';
// Import Types
import {OfferType} from '../../mocks/offer-mock';
import {CommentElementType} from '../../mocks/comments-mocks';

// Create Types
type OfferProps = {
  offer: OfferType;
  comments: CommentElementType[];
}

// Create Offer
function Offer({offer, comments}: OfferProps): JSX.Element {
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
export {Offer};
