<<<<<<< HEAD
type OfferImageProps = {
  imgSrc: string;
  imgAlt: string;
}

function OfferImage({imgSrc, imgAlt}: OfferImageProps): JSX.Element {
  return (
    <div className='offer__image-wrapper'>
      <img className='offer__image' src={imgSrc} alt={imgAlt} />
=======
// Create OfferImage
function OfferImage(): JSX.Element {
  return (
    <div className='offer__image-wrapper'>
      <img className='offer__image' src='img/room.jpg' alt='Photo studio' />
>>>>>>> 6b372f6 (add: components offer-page)
    </div>
  );
}

<<<<<<< HEAD
export {OfferImage};
=======
// Export OfferImage
export default OfferImage;
>>>>>>> 6b372f6 (add: components offer-page)
