import { Link } from 'react-router-dom';
import { FavoriteCard } from './favorites-card';
import { AppRoute } from '../../const';
import { FavoriteType } from '../../types/favorite';
import { useAppDispatch } from '../../hooks/hooks';
import { changeCity } from '../../store/action';

type FavoriteItemProps = {
  city: string;
  favoriteOffers: FavoriteType[];
};


function FavoriteItem({ city, favoriteOffers }: FavoriteItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  function handleClick(): void {
    dispatch(changeCity(city));
  }


  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link
            className="locations__item-link"
            to={AppRoute.Main}
            onClick={handleClick}
          >
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

export { FavoriteItem };
