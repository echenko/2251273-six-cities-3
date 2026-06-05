import { FavoriteItem } from './favorite-item';
import { getFavoriteOffersCities } from '../../utils';
import { useAppSelector } from '../../hooks/hooks';

function Favorites(): JSX.Element {
  const favoritesOffers = useAppSelector((state) => state.OFFERS.favoriteOffers);
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

export {Favorites};
