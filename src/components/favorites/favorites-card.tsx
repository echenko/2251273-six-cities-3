// Import React
import { Link } from 'react-router-dom';
// Import Components
import { CardPrice } from '../card/card-price';
import { CardMark } from '../card/card-mark';
import { CardRating } from '../card/card-rating';
import { CardName } from '../card/card-name';
import { CardType } from '../card/card-type';
// Import Constants
import { AppRoute } from '../../const';
// Import Types
import { FavoriteType } from '../../mocks/favorite-mocks';

// Create Types
type FavoriteCardProps = {
  offer: FavoriteType;
};

// Create FavoriteCard
function FavoriteCard({ offer }: FavoriteCardProps): JSX.Element {
  return (
    <article className="favorites__card place-card">
      {offer.isPremium && <CardMark />}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <CardPrice cardPrice={offer.price} isFavorite={offer.isFavorite} />
        <CardRating cardRating={offer.rating} />
        <CardName cardName={offer.title} />
        <CardType cardType={offer.type} />
      </div>
    </article>
  );

}

// Export FavoriteCard
export {FavoriteCard};
