<<<<<<< HEAD
import { OfferType } from '../../types/offer';

type OfferPriceProps = {
  offer: OfferType;
}

function OfferPrice({offer}: OfferPriceProps): JSX.Element {
  return (
    <div className='offer__price'>
      <b className='offer__price-value'>&euro;{offer.price}</b>
=======
// Create OfferPrice
function OfferPrice(): JSX.Element {
  return (
    <div className='offer__price'>
      <b className='offer__price-value'>&euro;120</b>
>>>>>>> 6b372f6 (add: components offer-page)
      <span className='offer__price-text'>&nbsp;night</span>
    </div>
  );
}

<<<<<<< HEAD
export {OfferPrice};
=======
// Export OfferPrice
export default OfferPrice;
>>>>>>> 6b372f6 (add: components offer-page)
