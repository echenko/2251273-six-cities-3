// Import Components
import {ReviewsList} from './reviews-list';
import {ReviewsForm} from './reviews-form';

//Import Utils
import {getCommentLength} from '../../utils';

//Import Types
import {CommentElementType} from '../../mocks/comments-mocks';

// Create Types
type ReviewsProps = {
  comments: CommentElementType[];
}
// Export Reviews
function Reviews({comments}: ReviewsProps): JSX.Element {
  return (
    <section className='offer__reviews reviews'>
      <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>{getCommentLength(comments)}</span></h2>
      <ReviewsList comments={comments} />
      <ReviewsForm />
    </section>
  );
}

// Export Reviews
export {Reviews};
