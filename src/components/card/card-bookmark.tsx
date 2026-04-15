// Create Types
type CardBookmarkProps = {
  isFavorite: boolean;
}

// Create setClassName
const setClassName = (isFavorite: boolean): string => isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button';

// Create CardBookmark
function CardBookmark({isFavorite}: CardBookmarkProps): JSX.Element {
  return (
    <button className={setClassName(isFavorite)} type="button">
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

// Export CardBookmark
export {CardBookmark};
