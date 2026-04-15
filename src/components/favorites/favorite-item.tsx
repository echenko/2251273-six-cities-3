// Import React
import { Link } from 'react-router-dom';
// Import Components
import { FavoriteCard } from './favorites-card';
// Import Constants
import { AppRoute } from '../../const';
// Import Types
import { FavoriteType } from '../../mocks/favorite-mocks';

// Create Types
type FavoriteItemProps = {
  city: string;
  favoriteOffers: FavoriteType[];
};

// Create FavoriteItem
function FavoriteItem({ city, favoriteOffers }: FavoriteItemProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={`${AppRoute.Main}?city=${city.toLowerCase()}`}>
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {favoriteOffers.map((offer) => (
          <FavoriteCard key={offer.id} offer={offer} />
        ))}
      </div>
    </li>
  );
}

// Export FavoriteItem
export { FavoriteItem };
