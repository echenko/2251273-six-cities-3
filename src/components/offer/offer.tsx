<<<<<<< HEAD
import { OfferMark } from './offer-mark';
import { OfferName } from './offer-name';
import { OfferRating } from './offer-rating';
import { OfferFeatures } from './offer-features';
import { OfferPrice } from './offer-price';
import { OfferInside } from './offer-inside';
import { OfferHost } from './offer-host';
import { Reviews } from '../reviews/reviews';
import { checkGoodOffer } from '../../utils';
import { OfferType } from '../../types/offer';

type OfferProps = {
  offer: OfferType;
}

function Offer({offer}: OfferProps): JSX.Element {

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
=======
// Import Components
import OfferMark from './offer-mark';
import OfferName from './offer-name';
import OfferRating from './offer-rating';
import OfferFeatures from './offer-features';
import OfferPrice from './offer-price';
import OfferInside from './offer-inside';
import OfferHost from './offer-host';
import Reviews from '../reviews/reviews';

// Create Offer
function Offer(): JSX.Element {
  return (
    <div className='offer__container container'>
      <div className='offer__wrapper'>
        <OfferMark />
        <OfferName />
        <OfferRating />
        <OfferFeatures />
        <OfferPrice />
        <OfferInside />
        <OfferHost />

>>>>>>> 6b372f6 (add: components offer-page)
        <Reviews />
      </div>
    </div>
  );
}

<<<<<<< HEAD
export {Offer};
=======
// Export Offer
export default Offer;
>>>>>>> 6b372f6 (add: components offer-page)
