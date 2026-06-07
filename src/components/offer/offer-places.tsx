import { Card } from '../card/card';
import { OffersElementType } from '../../types/offers';

type NearPlacesProps = {
  offers: OffersElementType[];
  onOfferHover: (offerId: string) => void;
};

function NearPlaces({offers, onOfferHover}: NearPlacesProps): JSX.Element {
  return (
    <section className='near-places places'>
      <h2 className='near-places__title'>Other places in the neighbourhood</h2>
      <div className='near-places__list places__list'>
        {offers.map((offer: OffersElementType) => (
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

export {NearPlaces};
