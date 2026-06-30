import {convertRatingToStars} from '../../utils';
import {OfferType} from '../../types/offer';

type OfferRatingProps = {
  offer: OfferType;
}

function OfferRating({offer}: OfferRatingProps): JSX.Element {
  return (
    <div className='offer__rating rating'>
      <div className='offer__stars rating__stars'>
        <span style={{ width: convertRatingToStars(Math.round(offer.rating))}}></span>
        <span className='visually-hidden'>Rating</span>
      </div>
      <span className='offer__rating-value rating__value'>{offer.rating}</span>
    </div>
  );
}

export {OfferRating};
