// Create Types
type CardNameProps = {
  cardName: string;
}

// Create CardName
function CardName({cardName}: CardNameProps): JSX.Element {
  return (
    <h2 className="place-card__name">
      <a href="#">{cardName}</a>
    </h2>
  );
}

// Export CardName
export {CardName};
