// Create CardImage
function CardImage({cardImgSrc, cardImgAlt}: {cardImgSrc: string; cardImgAlt: string}): JSX.Element {
  return (
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img className="place-card__image" src={cardImgSrc} width="260" height="200" alt={cardImgAlt} />
      </a>
    </div>
  );
}

// Export CardImage
export default CardImage;
