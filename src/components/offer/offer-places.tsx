// Import Components
import { Card } from '../card/card';
// Import Utils
import { getTestOffers } from '../../utils';
// Import Types
import { OffersElementType } from '../../mocks/offers-mocks';

type NearPlacesProps = {
  offers: OffersElementType[];
  onOfferHover: (offerId: string) => void;
};

// Create NearPlaces
function NearPlaces({offers, onOfferHover}: NearPlacesProps): JSX.Element {
  return (
    <section className='near-places places'>
      <h2 className='near-places__title'>Other places in the neighbourhood</h2>
      <div className='near-places__list places__list'>
        {getTestOffers(offers).map((offer: OffersElementType) => (
          // TODO: Доработать!
          <Card
            key={offer.id}
            offer={offer}
            onOfferHover={onOfferHover}
          />
        ))}
      </div>
    </section>
  );
}

// Export NearPlaces
export {NearPlaces};
