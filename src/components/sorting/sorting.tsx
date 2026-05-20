// Import constants
import { PLACES_OPTIONS } from '../../const';
// Import Utils
import { clsx } from 'clsx';
// Import React
import { useRef } from 'react';
// Import Hooks
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
// Import Actions
import { changeSorting, sortOffers, resetOffers } from '../../store/action';

// Create Sorting
function Sorting(): JSX.Element {
  const placesOption = useRef<HTMLUListElement>(null);
  const sortingOffers = useAppSelector((state) => state.sortingOffers);
  const dispatch = useAppDispatch();

  function handleClickSorting(event: React.MouseEvent<HTMLSpanElement>): void {
    event.preventDefault();
    placesOption.current?.classList.toggle('places__options--opened');
  }

  function handleClickOption(event: React.MouseEvent<HTMLLIElement>): void {
    const sorting: string = event.currentTarget.dataset.sorting || '';
    event.preventDefault();
    placesOption.current?.classList.remove('places__options--opened');
    dispatch(changeSorting(sorting));
    if (sorting === PLACES_OPTIONS[0]) {
      dispatch(resetOffers());
    } else {
      dispatch(sortOffers());
    }
  }

  function handleMouseLeave(): void {
    placesOption.current?.classList.remove('places__options--opened');
  }

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onMouseLeave={handleMouseLeave}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleClickSorting}
      >
        {sortingOffers}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom" ref={placesOption}>
        {PLACES_OPTIONS.map((option) => (
          <li
            className={
              clsx('places__option',
                {'places__option--active': option === sortingOffers})
            }
            data-sorting={option}
            key={option}
            tabIndex={0}
            onClick={handleClickOption}
          >{option}
          </li>
        ))}
      </ul>
    </form>
  );
}

// Export Sorting
export {Sorting};
