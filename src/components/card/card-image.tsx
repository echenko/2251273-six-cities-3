// Create CardImage
function CardImage(): JSX.Element {
  return (
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img className="place-card__image" src="img/apartment-01.jpg" width="260" height="200" alt="Place image" />
      </a>
    </div>
  );
}

// Export CardImage
export default CardImage;
