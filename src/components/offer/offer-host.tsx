// Import Utils
import {getFirstName} from '../../utils';
// Import Types
import {OfferType} from '../../mocks/offer-mock';

// Create Types
type OfferHostProps = {
  offer: OfferType;
}

// Create OfferHost
function OfferHost({offer}: OfferHostProps): JSX.Element {
  return (
    <div className='offer__host'>
      <h2 className='offer__host-title'>Meet the host</h2>
      <div className='offer__host-user user'>
        <div className={offer.host.isPro ? 'offer__avatar-wrapper user__avatar-wrapper offer__avatar-wrapper--pro' : 'offer__avatar-wrapper user__avatar-wrapper'}>
          <img className='offer__avatar user__avatar' src={offer.host.avatarUrl} width='74' height='74' alt='Host avatar' />
        </div>
        <span className='offer__user-name'>
          {getFirstName(offer.host.name)}
        </span>
        {offer.host.isPro && <span className='offer__user-status'>Pro</span>}
      </div>
      <div className='offer__description'>
        {/* TODO: Доработать описание!*/}
        {offer.description}
      </div>
    </div>
  );
}

// Export OfferHost
export {OfferHost};
