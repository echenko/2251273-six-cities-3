// Create CardBookmark
function CardBookmark(): JSX.Element {
  return (
    <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

// Export CardBookmark
export default CardBookmark;
