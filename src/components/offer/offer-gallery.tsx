<<<<<<< HEAD
import { OfferImage } from './offer-image';
import { OfferType } from '../../types/offer';
import { MAX_OFFER_IMAGES_COUNT } from '../../const';

type OfferGalleryProps = {
  offer: OfferType;
};

function OfferGallery({offer}: OfferGalleryProps): JSX.Element {
  return (
    <div className='offer__gallery-container container'>
      <div className='offer__gallery'>
        {offer.images.slice(0, MAX_OFFER_IMAGES_COUNT).map((imgSrc, index) => (
          <OfferImage key={`${imgSrc + index}`} imgSrc={imgSrc} imgAlt={offer.title} />
        ))}
=======
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
>>>>>>> 6b372f6 (add: components offer-page)
      </div>
    </div>
  );
}

<<<<<<< HEAD
export {OfferGallery};
=======
// Export OfferGallery
export default OfferGallery;
>>>>>>> 6b372f6 (add: components offer-page)
