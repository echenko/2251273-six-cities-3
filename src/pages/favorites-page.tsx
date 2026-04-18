// Import Components
import { Favorites } from '../components/favorites/favorites';
// Import Mocks
import { FavoriteType } from '../mocks/favorite-mocks';

// Create Types
type FavoritesPageProps = {
  favoritesOffers: FavoriteType[];
}

// Create FavoritesPage
function FavoritesPage({favoritesOffers}: FavoritesPageProps): JSX.Element {
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <Favorites favoritesOffers={favoritesOffers} />
      </div>
    </main>
  );
}

// Export FavoritesPage
export {FavoritesPage};
