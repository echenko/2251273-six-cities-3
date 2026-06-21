import { useState, useRef, useEffect } from 'react';
import { PLACES_OPTIONS } from '../../const';
import { clsx } from 'clsx';
import { getPlacesOptionsLabel } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changeSorting } from '../../store/action';
import { getSelectedSorting } from '../../store/selectors/sorting-slice';

function Sorting(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const sortingOffers = useAppSelector(getSelectedSorting);
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLFormElement>(null);

  // Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleSelect = (value: string) => {
    setIsOpen(false);
    dispatch(changeSorting(value));
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      ref={containerRef}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggleOpen}
        onKeyDown={(e) => handleKeyDown(e, toggleOpen)}
      >
        {getPlacesOptionsLabel(sortingOffers)}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={clsx('places__options places__options--custom', { 'places__options--opened': isOpen })}
        role="listbox"
      >
        {PLACES_OPTIONS.map((option) => (
          <li
            key={option.value}
            className={clsx('places__option', { 'places__option--active': option.value === sortingOffers })}
            role="option"
            aria-selected={option.value === sortingOffers}
            tabIndex={0}
            onClick={() => handleSelect(option.value)}
            onKeyDown={(e) => handleKeyDown(e, () => handleSelect(option.value))}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </form>
  );
}

export { Sorting };
