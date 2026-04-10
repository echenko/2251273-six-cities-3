// Create OfferRating
function OfferRating(): JSX.Element {
  return (
    <div className='offer__rating rating'>
      <div className='offer__stars rating__stars'>
        <span style={{ width: '80%' }}></span>
        <span className='visually-hidden'>Rating</span>
      </div>
      <span className='offer__rating-value rating__value'>4.8</span>
    </div>
  );
}

// Export OfferRating
export default OfferRating;
