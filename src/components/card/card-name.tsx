// Import React
import { Link } from 'react-router-dom';
// Import Constants
import { AppRoute } from '../../const';

// Create Types
type CardNameProps = {
  cardName: string;
}

// Create CardName
function CardName({cardName}: CardNameProps): JSX.Element {
  return (
    <h2 className="place-card__name">
      <Link to={AppRoute.Offer}>{cardName}</Link>
    </h2>
  );
}

// Export CardName
export {CardName};
