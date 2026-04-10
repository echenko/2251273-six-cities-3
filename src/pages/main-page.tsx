// Import Components
import Header from '../components/header/header';
import Locations from '../components/locations/locations';
import Cities from '../components/cities/cities';

// Create MainPage
function MainPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Locations />
        </div>
        <Cities />
      </main>
    </div>
  );
}

// Export MainPage
export default MainPage;
