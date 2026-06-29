import { Favorites } from '../components/favorites/favorites';
import { FavoritesEmpty } from '../components/favorites/favorites-empty';
import { useAppSelector } from '../hooks/hooks';
import { getFavoriteOffers } from '../store/selectors/offers-slice';
import { clsx } from 'clsx';

function FavoritesPage(): JSX.Element {
  const favoritesOffers = useAppSelector(getFavoriteOffers);

  return (
    <main className="page__main page__main--favorites">
      <div className={
        clsx('page__favorites-container container',
          { 'page__favorites-container--empty': !favoritesOffers.length })
      }
      >
        {!!favoritesOffers.length && <Favorites />}
        {!favoritesOffers.length && <FavoritesEmpty />}
      </div>
    </main>
  );
}

export { FavoritesPage };
