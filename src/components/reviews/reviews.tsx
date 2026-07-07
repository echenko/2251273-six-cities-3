<<<<<<< HEAD
import { ReviewsComments } from './reviews-comments';
import { ReviewsForm } from './reviews-form';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { useEffect } from 'react';
import { fetchCommentsOfferAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { AuthorizationStatus, TYPE_OF_ERROR, REVIEW_OFFER } from '../../const';
import { getSelectedOfferCommentsLoadingStatus } from '../../store/selectors/offer-slice';
import { Message } from '../message/message';
import { setErrorType } from '../../store/action';
import { sortCommentsByDate } from '../../utils';
import { checkErrorAddComment } from '../../store/selectors/error-slice';

function Reviews(): JSX.Element {
  const dispatch = useAppDispatch();
  const statusAuthorization = useAppSelector((state) => state.USER.authorizationStatus);
  const comments = useAppSelector((state) => state.OFFER.selectedOfferComments);
  const offerId: string = useParams().offerId || '';
  const selectedOfferCommentsLoadingStatus = useAppSelector(getSelectedOfferCommentsLoadingStatus);
  const errorAddComment = useAppSelector(checkErrorAddComment);

  useEffect(() => {
    dispatch(fetchCommentsOfferAction(offerId)).unwrap().then(() => {
      dispatch(setErrorType(null));
    }).catch(() => {
      dispatch(setErrorType(TYPE_OF_ERROR.ERROR_LOADING_COMMENTS));
    });
  }, [dispatch, offerId]);

  return (
    <section className='offer__reviews reviews'>
      <h2 className='reviews__title'>Reviews &middot;
        <span className='reviews__amount'>{comments.length}</span>
      </h2>
      {(!selectedOfferCommentsLoadingStatus || errorAddComment) &&
        <Message />}
      <ReviewsComments comments={sortCommentsByDate(comments).slice(0, REVIEW_OFFER.MAX_COMMENTS_COUNT)} />
      {statusAuthorization === AuthorizationStatus.Auth && <ReviewsForm />}


=======
// Import Components
import ReviewsList from './reviews-list';
import ReviewsForm from './reviews-form';

// Export Reviews
function Reviews(): JSX.Element {
  return (
    <section className='offer__reviews reviews'>
      <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>1</span></h2>
      <ReviewsList />
      <ReviewsForm />
>>>>>>> 6b372f6 (add: components offer-page)
    </section>
  );
}

<<<<<<< HEAD
export { Reviews };
=======
// Export Reviews
export default Reviews;
>>>>>>> 6b372f6 (add: components offer-page)
