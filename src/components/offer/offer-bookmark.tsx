// Import Types
import { OfferType } from '../../mocks/offer-mock';

// Create OfferBookmark
function OfferBookmark({offer}: {offer: OfferType}): JSX.Element {
  return (
    <button className={offer.isFavorite ? 'offer__bookmark-button offer__bookmark-button--active button' : 'offer__bookmark-button button'} type='button'>
      <svg className='offer__bookmark-icon' width='31' height='33'>
        <use xlinkHref='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden'>To bookmarks</span>
    </button>
  );
}

// Export OfferBookmark
export default OfferBookmark;
