import { convertRatingToStars } from '../../utils';
import { CommentElementType } from '../../types/comments';
import dayjs from 'dayjs';

type ReviewsListProps = {
  comments: CommentElementType[];
};

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
            <time
              className='reviews__time'
              dateTime={dayjs(comment.date).format('YYYY-MM-DD')}
            >
              {dayjs(comment.date).format('MMMM YYYY')}
            </time>
          </div>
        </li>
      ))}
    </ul>
  );
}

export {ReviewsList};
