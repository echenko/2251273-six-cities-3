// Import Components
import ReviewsList from './reviews-list';
import ReviewsForm from './reviews-form';
//Import Types
import {CommentElementType} from '../../mocks/comments-mocks';
//Import Utils
import { getCommentLength } from '../../utils';


// Export Reviews
function Reviews({comments}: {comments: CommentElementType[]}): JSX.Element {
  return (
    <section className='offer__reviews reviews'>
      <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>{getCommentLength(comments)}</span></h2>
      <ReviewsList comments={comments} />
      <ReviewsForm />
    </section>
  );
}

// Export Reviews
export default Reviews;
