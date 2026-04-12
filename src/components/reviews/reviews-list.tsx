// Import Utils
import { convertRatingToStars } from '../../utils';

// Import Types
import { CommentElementType } from '../../mocks/comments-mocks';

// Create Types
type ReviewsListProps = {
  comments: CommentElementType[];
};

// Create ReviewsList
function ReviewsList({ comments }: ReviewsListProps): JSX.Element {
  return (
    <ul className='reviews__list'>
      {/* TODO: Доработать! PRO! */}
      {comments.map((comment) => (
        <li className='reviews__item' key={comment.id}>
          <div className='reviews__user user'>
            <div className='reviews__avatar-wrapper user__avatar-wrapper'>
              <img className='reviews__avatar user__avatar' src={comment.user.avatarUrl} width='54' height='54' alt='Reviews avatar' />
            </div>
            <span className='reviews__user-name'>
              {comment.user.name}
            </span>
          </div>
          <div className='reviews__info'>
            <div className='reviews__rating rating'>
              <div className='reviews__stars rating__stars'>
                <span style={{ width: convertRatingToStars(comment.rating)}}></span>
                <span className='visually-hidden'>Rating</span>
              </div>
            </div>
            <p className='reviews__text'>
              {comment.comment}
            </p>
            {/* TODO: Доработать дату!*/}
            <time className='reviews__time' dateTime='2019-04-24'>April 2019</time>
          </div>
        </li>
      ))};
    </ul>
  );
}

// Export ReviewsList
export {ReviewsList};
