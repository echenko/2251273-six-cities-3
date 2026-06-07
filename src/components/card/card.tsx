import {CardMark} from './card-mark';
import {CardImage} from './card-image';
import {CardPrice} from './card-price';
import {CardRating} from './card-rating';
import {CardName} from './card-name';
import {CardType} from './card-type';
import {OffersElementType} from '../../types/offers';
import { memo } from 'react';

type CardProps = {
  offer: OffersElementType;
  onOfferHover: (offerId: string) => void;
}

function Card({offer, onOfferHover}: CardProps): JSX.Element {
  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => onOfferHover(offer.id)}
      onMouseLeave={() => onOfferHover('')}
    >
      {offer.isPremium && <CardMark />}
      <CardImage cardImgSrc={offer.previewImage} cardImgAlt={offer.title} offerId={offer.id} />
      <div className="place-card__info">
        <CardPrice offer={offer} />
        <CardRating cardRating={offer.rating} />
        <CardName cardName={offer.title} offerId={offer.id} />
        <CardType cardType={offer.type} />
      </div>
    </article>
  );
}

const CardMemo = memo(Card);

export {CardMemo};
