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
      </div>
    </div>
  );
}

export {OfferGallery};
