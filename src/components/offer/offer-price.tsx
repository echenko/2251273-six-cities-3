import { OfferType } from '../../types/offer';

type OfferPriceProps = {
  offer: OfferType;
}

function OfferPrice({offer}: OfferPriceProps): JSX.Element {
  return (
    <div className='offer__price'>
      <b className='offer__price-value'>&euro;{offer.price}</b>
      <span className='offer__price-text'>&nbsp;night</span>
    </div>
  );
}

export {OfferPrice};
