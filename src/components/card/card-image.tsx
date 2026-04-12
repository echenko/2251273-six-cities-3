// Create Types
type CardImageProps = {
  cardImgSrc: string;
  cardImgAlt: string;
};

// Create CardImage
function CardImage({cardImgSrc, cardImgAlt}: CardImageProps): JSX.Element {
  return (
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img className="place-card__image" src={cardImgSrc} width="260" height="200" alt={cardImgAlt} />
      </a>
    </div>
  );
}

// Export CardImage
export {CardImage};
