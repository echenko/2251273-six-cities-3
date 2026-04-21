// Import React
import { useState } from 'react';
// Import Types
import { OfferType } from '../../mocks/offer-mock';

// Create Types
type OfferBookmarkProps = {
  offer: OfferType;
}

// Create OfferBookmark
function OfferBookmark({ offer }: OfferBookmarkProps): JSX.Element {
  const [isFavorite, setIsFavorite] = useState(offer.isFavorite);

  function handleClick(): void {
    setIsFavorite(!isFavorite);
    // TODO: Доработать добавление в избранное!
  }

  return (
    <button className={isFavorite ? 'offer__bookmark-button offer__bookmark-button--active button' : 'offer__bookmark-button button'} type='button' onClick={handleClick}>
      <svg className='offer__bookmark-icon' width='31' height='33'>
        <use xlinkHref='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden'>To bookmarks</span>
    </button>
  );
}

// Export OfferBookmark
export { OfferBookmark };
