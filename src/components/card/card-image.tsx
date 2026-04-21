// Import React
import {Link} from 'react-router-dom';
// Import Constants
import {AppRoute} from '../../const';

// Create Types
type CardImageProps = {
  cardImgSrc: string;
  cardImgAlt: string;
  offerId: string;
};

// Create CardImage
function CardImage({cardImgSrc, cardImgAlt, offerId}: CardImageProps): JSX.Element {
  return (
    <div className="cities__image-wrapper place-card__image-wrapper">
      <Link to={`${AppRoute.Offer}/${offerId}`}>
        <img className="place-card__image" src={cardImgSrc} width="260" height="200" alt={cardImgAlt} />
      </Link>
    </div>
  );
}

// Export CardImage
export {CardImage};
