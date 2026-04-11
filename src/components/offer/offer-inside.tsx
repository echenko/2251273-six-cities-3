// Import Types
import { OfferType } from '../../mocks/offer-mock';

// Create OfferInside
function OfferInside({offer}: {offer: OfferType}): JSX.Element {
  return (
    <div className='offer__inside'>
      <h2 className='offer__inside-title'>What&apos;s inside</h2>
      <ul className='offer__inside-list'>
        {offer.goods.map((good, index) => (
          // TODO: Add key!
          // eslint-disable-next-line
          <li className='offer__inside-item' key={index}>
            {good}
          </li>
        ))}

      </ul>
    </div>
  );
}

// Export OfferInside
export default OfferInside;
