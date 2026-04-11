// Create CardName
function CardName({cardName}: {cardName: string}): JSX.Element {
  return (
    <h2 className="place-card__name">
      <a href="#">{cardName}</a>
    </h2>
  );
}

// Export CardName
export default CardName;
