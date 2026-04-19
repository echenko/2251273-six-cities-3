// Import React
import { useState } from 'react';
// Import Types
import { OffersElementType } from '../../mocks/offers-mocks';

// Create Types
type CardBookmarkProps = {
  offer: OffersElementType;
}

// Create setClassName
const setClassName = (isFavorite: boolean): string => isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button';


// Create CardBookmark
function CardBookmark({offer}: CardBookmarkProps): JSX.Element {
  const [isFavoriteState, setIsFavoriteState] = useState(offer.isFavorite);

  function handleClick(): void {
    setIsFavoriteState(!isFavoriteState);
    // TODO: Доработать!
  }

  return (
    <button className={setClassName(isFavoriteState)} type="button" onClick={handleClick}>
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

// Export CardBookmark
export {CardBookmark};
