// Import Components Pages
import MainPage from '../../pages/main-page';
// TODO: Исправить!
// import OffersPage from '../../pages/offers-page';
// Import Types
import { OffersElementType } from '../../mocks/offers-mocks';

// Create App
function App({offers}: {offers: OffersElementType[]}): JSX.Element {
  return (
    <>
      <MainPage
        offers={offers}
      />
      {/* TODO: Исправить! */}
      {/* <OffersPage offers={offers}/> */}
    </>
  );
}

// Export App
export default App;
