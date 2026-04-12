// Import Components
import {CardBookmark} from './card-bookmark';

// Create Types
type CardPriceProps = {
  cardPrice: number;
  isFavorite: boolean;
};

// Create CardPrice
function CardPrice({cardPrice, isFavorite}: CardPriceProps): JSX.Element {
  return (
    <div className="place-card__price-wrapper">
      <div className="place-card__price">
        <b className="place-card__price-value">&euro;{cardPrice}</b>
        <span className="place-card__price-text">&#47;&nbsp;night</span>
      </div>
      <CardBookmark isFavorite={isFavorite} />
    </div>
  );
}

// Export CardPrice
export {CardPrice};
