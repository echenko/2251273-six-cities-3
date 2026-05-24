import { PLACES_OPTIONS } from '../../const';
import { clsx } from 'clsx';
import { useRef } from 'react';
import { getPlacesOptionsLabel } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changeSorting } from '../../store/action';

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
        {getPlacesOptionsLabel(sortingOffers)}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom" ref={placesOption}>
        {PLACES_OPTIONS.map((option) => (
          <li
            className={
              clsx('places__option',
                {'places__option--active': option.value === sortingOffers})
            }
            data-sorting={option.value}
            key={option.value}
            tabIndex={0}
            onClick={handleClickOption}
          >{option.label}
          </li>
        ))}
      </ul>
    </form>
  );
}

// Export Sorting
export {Sorting};
