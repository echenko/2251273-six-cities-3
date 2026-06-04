import { Locations } from '../components/locations/locations';
import { Cities } from '../components/cities/cities';
import { filterOffersByCity, getSortedOffersByType } from '../utils';
import { useAppSelector } from '../hooks/hooks';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { fetchOffersAction } from '../store/api-actions';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  const city = useAppSelector((state) => state.CITY.SelectedCity);
  const offers = useAppSelector((state) => state.OFFERS.offers);
  const sortingOffers = useAppSelector((state) => state.SORTING.SelectedSorting);
  const filteredOffers = filterOffersByCity(offers, city);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <Locations/>
      </div>
      <Cities
        offers={getSortedOffersByType(filteredOffers, sortingOffers)}
        city={city}
      />
    </main>
  );
}

export { MainPage };
