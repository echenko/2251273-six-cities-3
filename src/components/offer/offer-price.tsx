// Import Types
import { OfferType } from '../../mocks/offer-mock';

// Create Types
type OfferPriceProps = {
  offer: OfferType;
}

// Create OfferPrice
function OfferPrice({offer}: OfferPriceProps): JSX.Element {
  return (
    <div className='offer__price'>
      <b className='offer__price-value'>&euro;{offer.price}</b>
      <span className='offer__price-text'>&nbsp;night</span>
    </div>
  );
}

// Export OfferPrice
export {OfferPrice};
