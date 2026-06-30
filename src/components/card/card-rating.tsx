import { convertRatingToStars } from '../../utils';

type CardRatingProps = {
  cardRating: number;
}

function CardRating({cardRating}: CardRatingProps): JSX.Element {
  return (
    <div className="place-card__rating rating">
      <div className="place-card__stars rating__stars">
        <span style={{ width: convertRatingToStars(Math.round(cardRating))}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}

export {CardRating};
