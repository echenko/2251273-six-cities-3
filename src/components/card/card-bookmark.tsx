<<<<<<< HEAD
import { useState, useRef } from 'react';
import { clsx } from 'clsx';
import { OffersElementType } from '../../types/offers';
import { postFavoriteOfferAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { switchButton } from '../../utils';
import { getAuthCheckedStatus } from '../../store/selectors/user-selector';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { updateOffers } from '../../store/action';

type CardBookmarkProps = {
  offer: OffersElementType;
}

function CardBookmark({ offer }: CardBookmarkProps): JSX.Element {
  const [isFavoriteState, setIsFavoriteState] = useState(offer.isFavorite);
  const dispatch = useAppDispatch();
  const addFavoriteButton = useRef<HTMLButtonElement | null>(null);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const navigation = useNavigate();

  async function handleClick(): Promise<void> {
    switchButton(addFavoriteButton.current, true);
    try {
      await dispatch(postFavoriteOfferAction({ id: offer.id, status: !isFavoriteState })).unwrap();
      dispatch(updateOffers({...offer, isFavorite: !isFavoriteState}));
      setIsFavoriteState(!isFavoriteState);
    } catch {
      throw new Error('Error postFavoriteOfferAction');
    } finally {
      switchButton(addFavoriteButton.current, false);
    }
  }

  function onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    if(!isAuthChecked) {
      navigation(AppRoute.Login);
      return;
    }
    handleClick();
  }

  return (
    <button
      ref={addFavoriteButton}
      className={
        clsx(
          'place-card__bookmark-button button',
          { 'place-card__bookmark-button--active': isFavoriteState }
        )
      }
      type="button"
      onClick={onClick}
    >
=======
// Create CardBookmark
function CardBookmark(): JSX.Element {
  return (
    <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
>>>>>>> 6b372f6 (add: components offer-page)
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

<<<<<<< HEAD
export { CardBookmark };
=======
// Export CardBookmark
export default CardBookmark;
>>>>>>> 6b372f6 (add: components offer-page)
