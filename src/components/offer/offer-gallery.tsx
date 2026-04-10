// Import Components
import OfferImage from './offer-image';

// Create OfferGallery
function OfferGallery(): JSX.Element {
  return (
    <div className='offer__gallery-container container'>
      <div className='offer__gallery'>
        <OfferImage />
        <div className='offer__image-wrapper'>
          <img className='offer__image' src='img/apartment-01.jpg' alt='Photo studio' />
        </div>
        <div className='offer__image-wrapper'>
          <img className='offer__image' src='img/apartment-02.jpg' alt='Photo studio' />
        </div>
        <div className='offer__image-wrapper'>
          <img className='offer__image' src='img/apartment-03.jpg' alt='Photo studio' />
        </div>
        <div className='offer__image-wrapper'>
          <img className='offer__image' src='img/studio-01.jpg' alt='Photo studio' />
        </div>
        <div className='offer__image-wrapper'>
          <img className='offer__image' src='img/apartment-01.jpg' alt='Photo studio' />
        </div>
      </div>
    </div>
  );
}

// Export OfferGallery
export default OfferGallery;
