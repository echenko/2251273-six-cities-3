import { CardBookmark } from './card-bookmark';
import { OffersElementType } from '../../types/offers';

type CardPriceProps = {
  offer: OffersElementType;
};

function CardPrice({offer}: CardPriceProps): JSX.Element {
  return (
    <div className="place-card__price-wrapper">
      <div className="place-card__price">
        <b className="place-card__price-value">&euro;{offer.price}</b>
        <span className="place-card__price-text">&#47;&nbsp;night</span>
      </div>
      <CardBookmark offer={offer} />
    </div>
  );
}

export {CardPrice};
