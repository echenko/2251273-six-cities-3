import { Card } from '../card/card';
import { OffersElementType } from '../../types/offers';
import { Message } from '../message/message';
import { useAppSelector } from '../../hooks/hooks';
import { getNearOffersLoadingStatus } from '../../store/selectors/offers-slice';
import { SYSTEM_MESSAGE } from '../../const';


type NearPlacesProps = {
  offers: OffersElementType[];
  onOfferHover: (offerId: string) => void;
};

function NearPlaces({offers, onOfferHover}: NearPlacesProps): JSX.Element {
  const nearOffersLoadingStatus = useAppSelector(getNearOffersLoadingStatus);
  return (
    <section className='near-places places'>
      <h2 className='near-places__title'>Other places in the neighbourhood</h2>
      {!nearOffersLoadingStatus &&
        <Message
          message={nearOffersLoadingStatus === false ? SYSTEM_MESSAGE.ERROR_LOADING_NEAR_OFFERS : SYSTEM_MESSAGE.UPLOADING_NEAR_OFFERS}
        />}
      <div className='near-places__list places__list'>
        {offers.map((offer: OffersElementType) => (
          <Card
            key={offer.id}
            offer={offer}
            onOfferHover={onOfferHover}
          />
        ))}
      </div>
    </section>
  );
}

export {NearPlaces};
