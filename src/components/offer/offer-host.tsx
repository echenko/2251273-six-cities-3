// Create OfferHost
function OfferHost(): JSX.Element {
  return (
    <div className='offer__host'>
      <h2 className='offer__host-title'>Meet the host</h2>
      <div className='offer__host-user user'>
        <div className='offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper'>
          <img className='offer__avatar user__avatar' src='img/avatar-angelina.jpg' width='74' height='74' alt='Host avatar' />
        </div>
        <span className='offer__user-name'>
          Angelina
        </span>
        <span className='offer__user-status'>
          Pro
        </span>
      </div>
      <div className='offer__description'>
        <p className='offer__text'>
          A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
        </p>
        <p className='offer__text'>
          An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
        </p>
      </div>
    </div>
  );
}

// Export OfferHost
export default OfferHost;
