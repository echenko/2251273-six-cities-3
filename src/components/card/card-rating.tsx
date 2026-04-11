// Import Utils
import {convertRatingToStars} from '../../utils';

// Create CardRating
function CardRating({cardRating}: {cardRating: number}): JSX.Element {

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
export default CardRating;
