// Import constants
import { PLACES_OPTIONS } from '../../const';

// Create Sorting
function Sorting(): JSX.Element {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {PLACES_OPTIONS.map((option) => (
          <li className="places__option places__option--active" key={option} tabIndex={0}>{option}</li>
        ))}
      </ul>
    </form>
  );
}

// Export Sorting
export default Sorting;
