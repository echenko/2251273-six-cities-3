<<<<<<< HEAD
import { useState, Fragment } from 'react';
import { REVIEW_OFFER, RATING_OFFER, TYPE_OF_ERROR } from '../../const';
import { fetchCommentsOfferAction, postCommentsOfferAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/hooks';
import { useParams } from 'react-router-dom';
import { setErrorType } from '../../store/action';

function ReviewsForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const offerId: string = useParams().offerId || '';

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [reviewsOffer, setReviewsOffer] = useState({
    rating: 0,
    comment: '',
  });

  function handleReviewsOfferChange(key: keyof typeof reviewsOffer, value: number | string) {
    setReviewsOffer({
      ...reviewsOffer,
      [key]: value,
    });
  }

  function checkButtonDisabled() {
    const isCommentValid = reviewsOffer.comment.length >= REVIEW_OFFER.MIN_COMMENT_LENGTH &&
      reviewsOffer.comment.length <= REVIEW_OFFER.MAX_COMMENT_LENGTH;
    const isRatingValid = reviewsOffer.rating !== 0;

    return !(isCommentValid && isRatingValid);
  }

  async function handleFormSubmit(): Promise<void> {
    setIsSubmitting(true);

    try {
      await dispatch(postCommentsOfferAction({
        offerId,
        comment: reviewsOffer.comment,
        rating: reviewsOffer.rating,
      })).unwrap();

      setReviewsOffer({
        rating: 0,
        comment: '',
      });
      dispatch(setErrorType(null));
      dispatch(fetchCommentsOfferAction(offerId));
    } catch {
      dispatch(setErrorType(TYPE_OF_ERROR.ERROR_ADD_COMMENT));
      throw new Error('Error');
    } finally {
      setIsSubmitting(false);
    }
  }

  function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleFormSubmit();
  }

  return (
    <form className='reviews__form form' action='#' method='post' onSubmit={onFormSubmit}>
      <label className='reviews__label form__label' htmlFor='review'>Your review</label>

      <div className='reviews__rating-form form__rating'>
        {RATING_OFFER.map(({ value, label }) => (
          <Fragment key={value}>
            <input
              className='form__rating-input visually-hidden'
              name='rating'
              value={value}
              id={`${value}-star${value > 1 ? 's' : ''}`}
              type='radio'
              onChange={(event) => handleReviewsOfferChange('rating', Number(event.target.value))}
              checked={value === reviewsOffer.rating}
              disabled={isSubmitting}
              data-testid={`rating-${value}`}
            />
            <label
              className='reviews__rating-label form__rating-label'
              htmlFor={`${value}-star${value > 1 ? 's' : ''}`}
              title={label}
            >
              <svg className='form__star-image' width='37' height='33'>
                <use xlinkHref='#icon-star'></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>

      <textarea
        className='reviews__textarea form__textarea'
        id='review'
        name='review'
        placeholder='Tell how was your stay, what you like and what can be improved'
        onChange={(event) => handleReviewsOfferChange('comment', event.target.value)}
        value={reviewsOffer.comment}
        disabled={isSubmitting}
      />

      <div className='reviews__button-wrapper'>

        <p className='reviews__help'>
          To submit review please make sure to set
          <span className='reviews__star'>rating</span>
          and describe your stay with at least
          <b className='reviews__text-amount'>{REVIEW_OFFER.MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button
          className='reviews__submit form__submit button'
          type='submit'
          disabled={isSubmitting || checkButtonDisabled()}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>

    </form>


  );
}

export { ReviewsForm };
=======
// Create ReviewsForm
function ReviewsForm(): JSX.Element {
  return (
    <form className='reviews__form form' action='#' method='post'>
      <label className='reviews__label form__label' htmlFor='review'>Your review</label>
      <div className='reviews__rating-form form__rating'>
        <input className='form__rating-input visually-hidden' name='rating' value='5' id='5-stars' type='radio' />
        <label htmlFor='5-stars' className='reviews__rating-label form__rating-label' title='perfect'>
          <svg className='form__star-image' width='37' height='33'>
            <use xlinkHref='#icon-star'></use>
          </svg>
        </label>

        <input className='form__rating-input visually-hidden' name='rating' value='4' id='4-stars' type='radio' />
        <label htmlFor='4-stars' className='reviews__rating-label form__rating-label' title='good'>
          <svg className='form__star-image' width='37' height='33'>
            <use xlinkHref='#icon-star'></use>
          </svg>
        </label>

        <input className='form__rating-input visually-hidden' name='rating' value='3' id='3-stars' type='radio' />
        <label htmlFor='3-stars' className='reviews__rating-label form__rating-label' title='not bad'>
          <svg className='form__star-image' width='37' height='33'>
            <use xlinkHref='#icon-star'></use>
          </svg>
        </label>

        <input className='form__rating-input visually-hidden' name='rating' value='2' id='2-stars' type='radio' />
        <label htmlFor='2-stars' className='reviews__rating-label form__rating-label' title='badly'>
          <svg className='form__star-image' width='37' height='33'>
            <use xlinkHref='#icon-star'></use>
          </svg>
        </label>

        <input className='form__rating-input visually-hidden' name='rating' value='1' id='1-star' type='radio' />
        <label htmlFor='1-star' className='reviews__rating-label form__rating-label' title='terribly'>
          <svg className='form__star-image' width='37' height='33'>
            <use xlinkHref='#icon-star'></use>
          </svg>
        </label>
      </div>
      <textarea className='reviews__textarea form__textarea' id='review' name='review' placeholder='Tell how was your stay, what you like and what can be improved'></textarea>
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set <span className='reviews__star'>rating</span> and describe your stay with at least <b className='reviews__text-amount'>50 characters</b>.
        </p>
        <button className='reviews__submit form__submit button' type='submit' disabled={false}>Submit</button>
      </div>
    </form>

  );
}

// Export ReviewsForm
export default ReviewsForm;
>>>>>>> 6b372f6 (add: components offer-page)
