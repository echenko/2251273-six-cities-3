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

        <Reviews />
      </div>
    </div>
  );
}

// Export Offer
export default Offer;
