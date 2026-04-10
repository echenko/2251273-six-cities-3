// Import Components
import OfferBookmark from './offer-bookmark';

// Create OfferName
function OfferName(): JSX.Element {
  return (
    <div className='offer__name-wrapper'>
      <h1 className='offer__name'>
        Beautiful &amp; luxurious studio at great location
      </h1>
      <OfferBookmark />
    </div>
  );
}

// Export OfferName
export default OfferName;
