import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type CardNameProps = {
  cardName: string;
  offerId: string;
}

function CardName({cardName, offerId}: CardNameProps): JSX.Element {
  return (
    <h2 className="place-card__name">
      <Link to={`${AppRoute.Offer}/${offerId}`}>{cardName}</Link>
    </h2>
  );
}

export {CardName};
