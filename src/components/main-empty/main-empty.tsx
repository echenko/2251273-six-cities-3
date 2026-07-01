import { memo } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { getSelectedCity } from '../../store/selectors/city-slice';

function MainEmpty(): JSX.Element {
  const city = useAppSelector(getSelectedCity);


  return (
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">No places to stay available</b>
        <p className="cities__status-description">We could not find any property available at the moment in {city}</p>
      </div>
    </section>
  );
}

const MainEmptyMemo = memo(MainEmpty);

export { MainEmptyMemo as MainEmpty };
