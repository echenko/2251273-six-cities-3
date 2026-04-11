// Create OfferImage
function OfferImage({imgSrc, imgAlt}: {imgSrc: string; imgAlt: string}): JSX.Element {
  return (
    <div className='offer__image-wrapper'>
      <img className='offer__image' src={imgSrc} alt={imgAlt} />
    </div>
  );
}

// Export OfferImage
export default OfferImage;
