import { Locations } from '../components/locations/locations';
import { Cities } from '../components/cities/cities';
import { filterOffersByCity, getSortedOffersByType } from '../utils';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { useEffect } from 'react';
import { fetchOffersAction } from '../store/api-actions';
import { clsx } from 'clsx';
import { getCheckedEmptyOffers } from '../store/selectors/offers-slice';
import { getSelectedCity } from '../store/selectors/city-slice';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const city = useAppSelector(getSelectedCity);
  const offers = useAppSelector((state) => state.OFFERS.offers);
  const sortingOffers = useAppSelector((state) => state.SORTING.SelectedSorting);
  const filteredOffers = filterOffersByCity(offers, city);
  const checkedEmptyOffers = useAppSelector(getCheckedEmptyOffers);

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  return (
    <main
      className={clsx('page__main', 'page__main--index', {'page__main--index-empty': checkedEmptyOffers})}
    >
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
