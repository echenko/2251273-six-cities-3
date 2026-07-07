// Import Components
import Header from '../components/header/header';
import OfferGallery from '../components/offer/offer-gallery';
import Offer from '../components/offer/offer';
import OfferMap from '../components/offer/offer-map';
import NearPlaces from '../components/places/near-places';

// Create OffersPage
function OffersPage(): JSX.Element {
  return (
    <div className='page'>
      <Header />

      <main className='page__main page__main--offer'>
        <section className='offer'>
          <OfferGallery />
          <Offer />
          <OfferMap />
        </section>
        <div className='container'>
          <NearPlaces />
        </div>
      </main>
    </div>
  );
}

// Export OffersPage
export default OffersPage;
