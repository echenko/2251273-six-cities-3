// Import Utils
import { convertRatingToStars } from '../../utils';

// Create Types
type CardRatingProps = {
  cardRating: number;
}

// Create CardRating
function CardRating({cardRating}: CardRatingProps): JSX.Element {
  return (
    <div className="place-card__rating rating">
      <div className="place-card__stars rating__stars">
        <span style={{ width: convertRatingToStars(cardRating)}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}

// Export CardRating
export {CardRating};
