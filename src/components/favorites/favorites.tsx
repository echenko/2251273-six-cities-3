// Import Components
import { FavoriteItem } from './favorite-item';
// Import Types
import { FavoriteType } from '../../mocks/favorite-mocks';
// Import Utils
import { getFavoriteOffersCities } from '../../utils';

// Create Types
type FavoritesProps = {
  favoritesOffers: FavoriteType[];
};

// Create Favorites
function Favorites({favoritesOffers}: FavoritesProps): JSX.Element {
  const favoriteOffersCities = getFavoriteOffersCities(favoritesOffers);
  const favoriteCities = Object.keys(favoriteOffersCities);

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {favoriteCities.map((city) => (
          <FavoriteItem
            key={city}
            city={city}
            favoriteOffers={favoriteOffersCities[city]}
          />
        ))}
      </ul>
    </section>
  );
}

// Export Favorites
export {Favorites};
