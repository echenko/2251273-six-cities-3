import { OfferImage } from './offer-image';
import { OfferType } from '../../types/offer';

type OfferGalleryProps = {
  offer: OfferType;
};

function OfferGallery({offer}: OfferGalleryProps): JSX.Element {
  return (
    <div className='offer__gallery-container container'>
      <div className='offer__gallery'>
        {offer.images.map((imgSrc, index) => (
          <OfferImage key={`${imgSrc + index}`} imgSrc={imgSrc} imgAlt={offer.title} />
        ))}
      </div>
    </div>
  );
}

export {OfferGallery};
