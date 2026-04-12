// Create Type
type CardTypeProps = {
  cardType: string;
}

// Create CardType
function CardType({cardType}: CardTypeProps): JSX.Element {
  return (
    <p className="place-card__type">{cardType}</p>
  );
}

// Export CardType
export {CardType};
