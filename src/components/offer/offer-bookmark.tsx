// Create OfferBookmark
function OfferBookmark(): JSX.Element {
  return (
    <button className='offer__bookmark-button button' type='button'>
      <svg className='offer__bookmark-icon' width='31' height='33'>
        <use xlinkHref='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden'>To bookmarks</span>
    </button>
  );
}

// Export OfferBookmark
export default OfferBookmark;
