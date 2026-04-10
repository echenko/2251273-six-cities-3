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
    </section>
  );
}

// Export Reviews
export default Reviews;
