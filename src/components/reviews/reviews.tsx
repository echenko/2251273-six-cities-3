import { ReviewsList } from './reviews-list';
import { ReviewsForm } from './reviews-form';
import { getCommentLength } from '../../utils';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { useEffect } from 'react';
import { fetchCommentsOfferAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';

// Export Reviews
function Reviews(): JSX.Element {
  const dispatch = useAppDispatch();
  const statusAuthorization = useAppSelector((state) => state.AuthorizationStatus);
  const comments = useAppSelector((state) => state.comments);
  const offerId: string = useParams().offerId || '';


  useEffect(() => {
    dispatch(fetchCommentsOfferAction(offerId));
  }, [dispatch, offerId]);


  return (
    <section className='offer__reviews reviews'>
      <h2 className='reviews__title'>Reviews &middot;
        <span className='reviews__amount'>{getCommentLength(comments)}</span>
      </h2>
      <ReviewsList comments={comments}/>
      {statusAuthorization === AuthorizationStatus.Auth && <ReviewsForm />}
    </section>
  );
}

// Export Reviews
export {Reviews};
