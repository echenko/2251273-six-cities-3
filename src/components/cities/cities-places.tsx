// Import Components
import {Sorting} from '../sorting/sorting';
import {Card} from '../card/card';
// Import Types
import {OffersElementType} from '../../mocks/offers-mocks';

// Create Types
type CitiesPlacesProps = {
  offers: OffersElementType[];
}

// Create CitiesPlaces
function CitiesPlaces({offers}: CitiesPlacesProps): JSX.Element {
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">312 places to stay in Amsterdam</b>
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
