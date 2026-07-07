<<<<<<< HEAD
import { useRef } from 'react';
import { clsx } from 'clsx';
import { OfferType } from '../../types/offer';
import { postFavoriteOfferAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { switchButton } from '../../utils';
import { getAuthCheckedStatus } from '../../store/selectors/user-selector';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { updateFavoriteSelectedOffer, updateFavoriteOffers } from '../../store/action';

type OfferBookmarkProps = {
  offer: OfferType;
}

function OfferBookmark({ offer }: OfferBookmarkProps): JSX.Element {
  const dispatch = useAppDispatch();
  const addFavoriteButton = useRef<HTMLButtonElement | null>(null);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const navigation = useNavigate();

  async function handleClick(): Promise<void> {
    switchButton(addFavoriteButton.current, true);
    try {
      const data = await dispatch(postFavoriteOfferAction({ id: offer.id, status: !offer.isFavorite })).unwrap();
      dispatch(updateFavoriteSelectedOffer(data));
      dispatch(updateFavoriteOffers(data));
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
          'offer__bookmark-button button',
          { 'offer__bookmark-button--active': offer.isFavorite })
      }
      type='button'
      onClick={onClick}
    >
=======
// Create OfferBookmark
function OfferBookmark(): JSX.Element {
  return (
    <button className='offer__bookmark-button button' type='button'>
>>>>>>> 6b372f6 (add: components offer-page)
      <svg className='offer__bookmark-icon' width='31' height='33'>
        <use xlinkHref='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden'>To bookmarks</span>
    </button>
  );
}

<<<<<<< HEAD
export { OfferBookmark };
=======
// Export OfferBookmark
export default OfferBookmark;
>>>>>>> 6b372f6 (add: components offer-page)
