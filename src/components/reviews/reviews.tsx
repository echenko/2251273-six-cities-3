import { ReviewsList } from './reviews-list';
import { ReviewsForm } from './reviews-form';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { useEffect } from 'react';
import { fetchCommentsOfferAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { AuthorizationStatus, TYPE_OF_ERROR, REVIEW_OFFER } from '../../const';
import { getSelectedOfferCommentsLoadingStatus } from '../../store/selectors/offer-slice';
import { Message } from '../message/message';
import { setErrorType } from '../../store/action';

function Reviews(): JSX.Element {
  const dispatch = useAppDispatch();
  const statusAuthorization = useAppSelector((state) => state.USER.authorizationStatus);
  const comments = useAppSelector((state) => state.OFFER.selectedOfferComments);
  const offerId: string = useParams().offerId || '';
  const selectedOfferCommentsLoadingStatus = useAppSelector(getSelectedOfferCommentsLoadingStatus);

  useEffect(() => {
    dispatch(fetchCommentsOfferAction(offerId));
  }, [dispatch, offerId]);

  useEffect(() => {
    if (!selectedOfferCommentsLoadingStatus) {
      dispatch(setErrorType(TYPE_OF_ERROR.ERROR_LOADING_COMMENTS));
    }
  }, [selectedOfferCommentsLoadingStatus, dispatch]);


  return (
    <section className='offer__reviews reviews'>
      <h2 className='reviews__title'>Reviews &middot;
        <span className='reviews__amount'>{comments.length}</span>
      </h2>
      {!selectedOfferCommentsLoadingStatus &&
        <Message />}
      <ReviewsList comments={comments.slice(0, REVIEW_OFFER.MAX_COMMENTS_COUNT)}/>
      {statusAuthorization === AuthorizationStatus.Auth && <ReviewsForm />}
    </section>
  );
}

export {Reviews};
