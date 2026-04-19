// Import Components
import {CardMark} from './card-mark';
import {CardImage} from './card-image';
import {CardPrice} from './card-price';
import {CardRating} from './card-rating';
import {CardName} from './card-name';
import {CardType} from './card-type';
// Import Types
import {OffersElementType} from '../../mocks/offers-mocks';

// Create Types
type CardProps = {
  offer: OffersElementType;
}

// Create Card
function Card({offer}: CardProps): JSX.Element {
  return (
    <article className="cities__card place-card">
      {offer.isPremium && <CardMark />}
      <CardImage cardImgSrc={offer.previewImage} cardImgAlt={offer.title} offer={offer} />
      <div className="place-card__info">
        <CardPrice offer={offer} />
        <CardRating cardRating={offer.rating} />
        <CardName cardName={offer.title} />
        <CardType cardType={offer.type} />
      </div>
    </article>
  );
}

// Export Card
export {Card};
