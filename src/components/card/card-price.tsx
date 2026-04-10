// Import Components
import Bookmark from '../bookmark/bookmark';

// Create CardPrice
function CardPrice(): JSX.Element {
  return (
    <div className="place-card__price-wrapper">
      <div className="place-card__price">
        <b className="place-card__price-value">&euro;120</b>
        <span className="place-card__price-text">&#47;&nbsp;night</span>
      </div>
      <Bookmark />
    </div>
  );
}

// Export CardPrice
export default CardPrice;
