// Import Components
import Places from '../places/places';
import Map from '../map/map';

// Create Cities
function Cities(): JSX.Element {
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <Places />
        <Map />
      </div>
    </div>
  );
}

// Export Cities
export default Cities;
