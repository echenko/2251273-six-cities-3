type OfferImageProps = {
  imgSrc: string;
  imgAlt: string;
}

// Create OfferImage
function OfferImage({imgSrc, imgAlt}: OfferImageProps): JSX.Element {
  return (
    <div className='offer__image-wrapper'>
      <img className='offer__image' src={imgSrc} alt={imgAlt} />
    </div>
  );
}

// Export OfferImage
export {OfferImage};
