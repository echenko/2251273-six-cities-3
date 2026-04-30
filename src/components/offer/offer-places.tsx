// Import Components
import { Card } from '../card/card';
// Import Utils
import { getTestOffers } from '../../utils';
// Import Types
import { OffersElementType } from '../../mocks/offers-mocks';

// Create NearPlaces
function NearPlaces({offers}: {offers: OffersElementType[]}): JSX.Element {
  return (
    <section className='near-places places'>
      <h2 className='near-places__title'>Other places in the neighbourhood</h2>
      <div className='near-places__list places__list'>
        {getTestOffers(offers).map((offer: OffersElementType) => (
          // TODO: Доработать!
          <Card key={offer.id} offer={offer} onOfferHover={() => {}} />
        ))}
      </div>
    </section>
  );
}

// Export NearPlaces
export {NearPlaces};
