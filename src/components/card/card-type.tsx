// Create CardType
function CardType({cardType}: {cardType: string}): JSX.Element {
  return (
    <p className="place-card__type">{cardType}</p>
  );
}

// Export CardType
export default CardType;
