// Import Components
import CardMark from './card-mark';
import CardImage from './card-image';
import CardPrice from './card-price';
import CardRating from './card-rating';
import CardName from './card-name';
import CardType from './card-type';

// Create Card
function Card(): JSX.Element {
  return (
    <article className="cities__card place-card">
      <CardMark />
      <CardImage />
      <div className="place-card__info">
        <CardPrice />
        <CardRating />
        <CardName />
        <CardType />
      </div>
    </article>
  );
}

// Export Card
export default Card;
