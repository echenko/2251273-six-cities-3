// Import Types
import { OfferType } from '../../mocks/offer-mock';

// Create Types
type OfferInsideProps = {
  offer: OfferType;
}

// Create OfferInside
function OfferInside({offer}: OfferInsideProps): JSX.Element {
  return (
    <div className='offer__inside'>
      <h2 className='offer__inside-title'>What&apos;s inside</h2>
      <ul className='offer__inside-list'>
        {offer.goods.map((good, index) => (
          <li className='offer__inside-item' key={`${good + index}`}>
            {good}
          </li>
        ))}

      </ul>
    </div>
  );
}

// Export OfferInside
export {OfferInside};
