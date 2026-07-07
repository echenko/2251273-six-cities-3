<<<<<<< HEAD
import { OfferType } from '../../types/offer';

type OfferInsideProps = {
  offer: OfferType;
}

function OfferInside({offer}: OfferInsideProps): JSX.Element {
=======
// Create OfferInside
function OfferInside(): JSX.Element {
>>>>>>> 6b372f6 (add: components offer-page)
  return (
    <div className='offer__inside'>
      <h2 className='offer__inside-title'>What&apos;s inside</h2>
      <ul className='offer__inside-list'>
<<<<<<< HEAD
        {offer.goods.map((good, index) => (
          <li className='offer__inside-item' key={`${good + index}`}>
            {good}
          </li>
        ))}

=======
        <li className='offer__inside-item'>
          Wi-Fi
        </li>
        <li className='offer__inside-item'>
          Washing machine
        </li>
        <li className='offer__inside-item'>
          Towels
        </li>
        <li className='offer__inside-item'>
          Heating
        </li>
        <li className='offer__inside-item'>
          Coffee machine
        </li>
        <li className='offer__inside-item'>
          Baby seat
        </li>
        <li className='offer__inside-item'>
          Kitchen
        </li>
        <li className='offer__inside-item'>
          Dishwasher
        </li>
        <li className='offer__inside-item'>
          Cabel TV
        </li>
        <li className='offer__inside-item'>
          Fridge
        </li>
>>>>>>> 6b372f6 (add: components offer-page)
      </ul>
    </div>
  );
}

<<<<<<< HEAD
export {OfferInside};
=======
// Export OfferInside
export default OfferInside;
>>>>>>> 6b372f6 (add: components offer-page)
