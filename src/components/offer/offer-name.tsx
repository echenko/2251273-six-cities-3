import { OfferBookmark } from './offer-bookmark';
import { OfferType } from '../../types/offer';

type OfferNameProps = {
  offer: OfferType;
}

function OfferName({offer}: OfferNameProps): JSX.Element {
  return (
    <div className='offer__name-wrapper'>
      <h1 className='offer__name'>
        {offer.title}
      </h1>
      <OfferBookmark offer={offer} />
    </div>
  );
}

export {OfferName};
