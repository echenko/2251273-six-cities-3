// Import React
import { useState } from 'react';
import { clsx } from 'clsx';
// Import Types
import { OffersElementType } from '../../mocks/offers-mocks';

// Create Types
type CardBookmarkProps = {
  offer: OffersElementType;
}

// Create CardBookmark
function CardBookmark({ offer }: CardBookmarkProps): JSX.Element {
  const [isFavoriteState, setIsFavoriteState] = useState(offer.isFavorite);

  function handleClick(): void {
    setIsFavoriteState(!isFavoriteState);
    // TODO: Доработать добавление в избранное!
  }

  return (
    <button className={
      clsx(
        'place-card__bookmark-button button',
        { 'place-card__bookmark-button--active': isFavoriteState }
      )
    } type="button" onClick={handleClick}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

// Export CardBookmark
export { CardBookmark };
