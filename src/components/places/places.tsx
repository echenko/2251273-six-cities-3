// Import Components
import Sorting from '../sorting/sorting';
import Card from '../card/card';

// Create Places
function Places(): JSX.Element {
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">312 places to stay in Amsterdam</b>
      <Sorting />
      <div className="cities__places-list places__list tabs__content">
        <Card />
        {/* TODO: Card Доработать карточки! */}
        <article className="cities__card place-card">
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
          <div className="cities__image-wrapper place-card__image-wrapper">
            <a href="#">
              <img className="place-card__image" src="img/apartment-01.jpg" width="260" height="200" alt="Place image" />
            </a>
          </div>
          <div className="place-card__info">
            <div className="place-card__price-wrapper">
              <div className="place-card__price">
                <b className="place-card__price-value">&euro;120</b>
                <span className="place-card__price-text">&#47;&nbsp;night</span>
              </div>
              <button className="place-card__bookmark-button button" type="button">
                <svg className="place-card__bookmark-icon" width="18" height="19">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="place-card__rating rating">
              <div className="place-card__stars rating__stars">
                <span style={{ width: '80%' }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <h2 className="place-card__name">
              <a href="#">Beautiful &amp; luxurious apartment at great location</a>
            </h2>
            <p className="place-card__type">Apartment</p>
          </div>
        </article>

        <article className="cities__card place-card">
          <div className="cities__image-wrapper place-card__image-wrapper">
            <a href="#">
              <img className="place-card__image" src="img/room.jpg" width="260" height="200" alt="Place image" />
            </a>
          </div>
          <div className="place-card__info">
            <div className="place-card__price-wrapper">
              <div className="place-card__price">
                <b className="place-card__price-value">&euro;80</b>
                <span className="place-card__price-text">&#47;&nbsp;night</span>
              </div>
              <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                <svg className="place-card__bookmark-icon" width="18" height="19">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">In bookmarks</span>
              </button>
            </div>
            <div className="place-card__rating rating">
              <div className="place-card__stars rating__stars">
                <span style={{ width: '80%' }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <h2 className="place-card__name">
              <a href="#">Wood and stone place</a>
            </h2>
            <p className="place-card__type">Room</p>
          </div>
        </article>

        <article className="cities__card place-card">
          <div className="cities__image-wrapper place-card__image-wrapper">
            <a href="#">
              <img className="place-card__image" src="img/apartment-02.jpg" width="260" height="200" alt="Place image" />
            </a>
          </div>
          <div className="place-card__info">
            <div className="place-card__price-wrapper">
              <div className="place-card__price">
                <b className="place-card__price-value">&euro;132</b>
                <span className="place-card__price-text">&#47;&nbsp;night</span>
              </div>
              <button className="place-card__bookmark-button button" type="button">
                <svg className="place-card__bookmark-icon" width="18" height="19">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="place-card__rating rating">
              <div className="place-card__stars rating__stars">
                <span style={{ width: '80%' }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <h2 className="place-card__name">
              <a href="#">Canal View Prinsengracht</a>
            </h2>
            <p className="place-card__type">Apartment</p>
          </div>
        </article>

        <article className="cities__card place-card">
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
          <div className="cities__image-wrapper place-card__image-wrapper">
            <a href="#">
              <img className="place-card__image" src="img/apartment-03.jpg" width="260" height="200" alt="Place image" />
            </a>
          </div>
          <div className="place-card__info">
            <div className="place-card__price-wrapper">
              <div className="place-card__price">
                <b className="place-card__price-value">&euro;180</b>
                <span className="place-card__price-text">&#47;&nbsp;night</span>
              </div>
              <button className="place-card__bookmark-button button" type="button">
                <svg className="place-card__bookmark-icon" width="18" height="19">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="place-card__rating rating">
              <div className="place-card__stars rating__stars">
                <span style={{ width: '100%' }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <h2 className="place-card__name">
              <a href="#">Nice, cozy, warm big bed apartment</a>
            </h2>
            <p className="place-card__type">Apartment</p>
          </div>
        </article>

        <article className="cities__card place-card">
          <div className="cities__image-wrapper place-card__image-wrapper">
            <a href="#">
              <img className="place-card__image" src="img/room.jpg" width="260" height="200" alt="Place image" />
            </a>
          </div>
          <div className="place-card__info">
            <div className="place-card__price-wrapper">
              <div className="place-card__price">
                <b className="place-card__price-value">&euro;80</b>
                <span className="place-card__price-text">&#47;&nbsp;night</span>
              </div>
              <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                <svg className="place-card__bookmark-icon" width="18" height="19">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">In bookmarks</span>
              </button>
            </div>
            <div className="place-card__rating rating">
              <div className="place-card__stars rating__stars">
                <span style={{ width: '80%' }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <h2 className="place-card__name">
              <a href="#">Wood and stone place</a>
            </h2>
            <p className="place-card__type">Room</p>
          </div>
        </article>
      </div>
    </section>
  );
}

// Export Places
export default Places;
