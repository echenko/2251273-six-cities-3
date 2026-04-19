// Import React
import { useState, Fragment } from 'react';
// Import Constants
import { REVIEW_OFFER, RATING_OFFER } from '../../const';

// Create ReviewsForm
function ReviewsForm(): JSX.Element {
  // Create state
  const [reviewsOffer, setReviewsOffer] = useState({
    rating: 0,
    comment: '',
  });

  // Create handleReviewsOfferChange
  function handleReviewsOfferChange(key: keyof typeof reviewsOffer, value: number | string) {
    setReviewsOffer({
      ...reviewsOffer,
      [key]: value,
    });
  }

  // Create handleFormSubmit
  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: Доработать!
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
                name='rating' value={value} id={`star-${value}`}
                type='radio'
                onChange={(event) => handleReviewsOfferChange('rating', Number(event.target.value))}
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
      >
      </textarea>
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set <span className='reviews__star'>rating</span> and describe your stay with at least <b className='reviews__text-amount'>{REVIEW_OFFER.MIN_COMMENT_LENGTH} characters</b>.
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

// Export ReviewsForm
export { ReviewsForm };
