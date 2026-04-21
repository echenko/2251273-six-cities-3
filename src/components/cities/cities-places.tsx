// Import Components
import { Sorting } from '../sorting/sorting';
import { Card } from '../card/card';
// Import Utils
import { getCounterOffers } from '../../utils';
// Import Types
import { OffersElementType } from '../../mocks/offers-mocks';

// Create Types
type CitiesPlacesProps = {
  offers: OffersElementType[];
  city: string;
}

// Create CitiesPlaces
function CitiesPlaces({offers, city}: CitiesPlacesProps): JSX.Element {
  const countOffers: number = getCounterOffers(offers);
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{countOffers} places to stay in {city}</b>
      <Sorting />
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer: OffersElementType) => (
          <Card key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  );
}

// Export CitiesPlaces
export {CitiesPlaces};
