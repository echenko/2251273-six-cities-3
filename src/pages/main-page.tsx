import { Locations } from '../components/locations/locations';
import { Cities } from '../components/cities/cities';
import { filterOffersByCity, getSortedOffersByType } from '../utils';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { useEffect } from 'react';
import { fetchOffersAction } from '../store/api-actions';
import { clsx } from 'clsx';
import { getSelectedCity } from '../store/selectors/city-slice';
import { getOffers } from '../store/selectors/offers-slice';
import { getSelectedSorting } from '../store/selectors/sorting-slice';
import { checkErrorEmptyOffers } from '../store/selectors/error-slice';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const city = useAppSelector(getSelectedCity);
  const offers = useAppSelector(getOffers);
  const sortingOffers = useAppSelector(getSelectedSorting);
  const filteredOffers = filterOffersByCity(offers, city);
  const checkEmptyOffers = useAppSelector(checkErrorEmptyOffers);

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  return (
    <main
      className={clsx('page__main', 'page__main--index', {'page__main--index-empty': checkEmptyOffers})}
    >
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <Locations/>
      </div>
      <Cities
        offers={getSortedOffersByType(filteredOffers, sortingOffers)}
        // offers={[]}
        city={city}
      />
    </main>
  );
}

export { MainPage };
