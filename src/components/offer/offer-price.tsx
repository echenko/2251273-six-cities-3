// Import Types
import { OfferType } from '../../mocks/offer-mock';

// Create OfferPrice
function OfferPrice({offer}: {offer: OfferType}): JSX.Element {
  return (
    <div className='offer__price'>
      <b className='offer__price-value'>&euro;{offer.price}</b>
      <span className='offer__price-text'>&nbsp;night</span>
    </div>
  );
}

// Export OfferPrice
export default OfferPrice;
