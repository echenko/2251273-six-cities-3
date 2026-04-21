// Import React
import { Link } from 'react-router-dom';
// Import Constants
import { AppRoute } from '../../const';

// Create Types
type CardNameProps = {
  cardName: string;
  offerId: string;
}

// Create CardName
function CardName({cardName, offerId}: CardNameProps): JSX.Element {
  return (
    <h2 className="place-card__name">
      <Link to={`${AppRoute.Offer}/${offerId}`}>{cardName}</Link>
    </h2>
  );
}

// Export CardName
export {CardName};
