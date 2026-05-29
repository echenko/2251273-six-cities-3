// Import Components
// import { ReviewsList } from './reviews-list';
// import { ReviewsForm } from './reviews-form';
// Import Constants
// import { AuthorizationStatus } from '../../const';
//Import Utils
// import { getCommentLength } from '../../utils';
//Import Types

// Export Reviews
function Reviews(): JSX.Element {

  return (
    <section className='offer__reviews reviews'>
      {/* <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>{getCommentLength(comments)}</span></h2>
      <ReviewsList comments={comments} />
      {statusAuthorization === AuthorizationStatus.Auth && <ReviewsForm />} */}
    </section>
  );
}

// Export Reviews
export {Reviews};
