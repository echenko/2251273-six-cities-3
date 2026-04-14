// Import Components
import {OfferImage} from './offer-image';
// Import Types
import { OfferType } from '../../mocks/offer-mock';

// Create Types
type OfferGalleryProps = {
  offer: OfferType;
};

// Create OfferGallery
function OfferGallery({offer}: OfferGalleryProps): JSX.Element {
  return (
    <div className='offer__gallery-container container'>
      <div className='offer__gallery'>
        {offer.images.map((imgSrc, index) => (
          // TODO: Add key!
          // eslint-disable-next-line
          <OfferImage key={index} imgSrc={imgSrc} imgAlt={offer.title} />
        ))}
      </div>
    </div>
  );
}

// Export OfferGallery
export {OfferGallery};
