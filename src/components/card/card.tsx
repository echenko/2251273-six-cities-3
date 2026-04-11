// Import Components
import CardMark from './card-mark';
import CardImage from './card-image';
import CardPrice from './card-price';
import CardRating from './card-rating';
import CardName from './card-name';
import CardType from './card-type';
// Import Types
import { OffersElementType } from '../../mocks/offers-mocks';

// Create Card
function Card({offer}: {offer: OffersElementType}): JSX.Element {
  return (
    <article className="cities__card place-card">
      {offer.isPremium && <CardMark />}
      <CardImage cardImgSrc={offer.previewImage} cardImgAlt={offer.title} />
      <div className="place-card__info">
        <CardPrice cardPrice={offer.price} isFavorite={offer.isFavorite} />
        <CardRating cardRating={offer.rating} />
        <CardName cardName={offer.title} />
        <CardType cardType={offer.type} />
      </div>
    </article>
  );
}

// Export Card
export default Card;
