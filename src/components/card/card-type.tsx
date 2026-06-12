type CardTypeProps = {
  cardType: string;
}

function CardType({cardType}: CardTypeProps): JSX.Element {
  return (
    <p className="place-card__type">{cardType}</p>
  );
}

export {CardType};
