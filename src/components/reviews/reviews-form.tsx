import { useState, Fragment } from 'react';
import { REVIEW_OFFER, RATING_OFFER } from '../../const';
import { postCommentsOfferAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/hooks';
import { useParams } from 'react-router-dom';

function ReviewsForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const offerId: string = useParams().offerId || '';
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

  async function onFormSubmit(): Promise<void> {
    try {
      await dispatch(postCommentsOfferAction({
        offerId,
        comment: reviewsOffer.comment,
        rating: reviewsOffer.rating,
      }));

      setReviewsOffer({
        rating: 0,
        comment: '',
      });

    } catch {
      setReviewsOffer({
        rating: 0,
        comment: '',
      });
      throw new Error('Error postReviewAction');
    }
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onFormSubmit();
  }

  return (
    <form className='reviews__form form' action='#' method='post' onSubmit={handleFormSubmit}>
      <label className='reviews__label form__label' htmlFor='review'>Your review</label>
      <div className='reviews__rating-form form__rating'>
        {RATING_OFFER.map(({ value, label }) => (
          (
            <Fragment key={value}>
              <input
                className='form__rating-input visually-hidden'
                name='rating'
                value={value}
                id={`star-${value}`}
                type='radio'
                onChange={(event) => handleReviewsOfferChange('rating', Number(event.target.value))}
                checked={value === reviewsOffer.rating}
              />
              <label
                className='reviews__rating-label form__rating-label'
                htmlFor={`star-${value}`}
                title={label}
              >
                <svg className='form__star-image' width='37' height='33'>
                  <use xlinkHref='#icon-star'></use>
                </svg>
              </label>
            </Fragment>

          )
        ))}
      </div>
      <textarea
        className='reviews__textarea form__textarea'
        id='review'
        name='review'
        placeholder='Tell how was your stay, what you like and what can be improved'
        onChange={(event) => handleReviewsOfferChange('comment', event.target.value)}
        value={reviewsOffer.comment}
      >
      </textarea>
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
          disabled={reviewsOffer.rating < REVIEW_OFFER.MIN_RATING_OFFER || reviewsOffer.comment.length <= REVIEW_OFFER.MIN_COMMENT_LENGTH}
        >Submit
        </button>
      </div>
    </form>

  );
}

export { ReviewsForm };
