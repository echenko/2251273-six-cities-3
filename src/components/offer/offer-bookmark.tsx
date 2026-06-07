import { useState } from 'react';
import { clsx } from 'clsx';
import { OfferType } from '../../types/offer';
import { postFavoriteOfferAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/hooks';
import { switchButton } from '../../utils';
import { useRef } from 'react';

type OfferBookmarkProps = {
  offer: OfferType;
}

function OfferBookmark({ offer }: OfferBookmarkProps): JSX.Element {
  const [isFavoriteState, setIsFavoriteState] = useState(offer.isFavorite);
  const dispatch = useAppDispatch();
  const addFavoriteButton = useRef<HTMLButtonElement | null>(null);

  async function handleClick(): Promise<void> {
    switchButton(addFavoriteButton.current, true);
    try {
      await dispatch(postFavoriteOfferAction({ id: offer.id, status: !isFavoriteState })).unwrap();
      setIsFavoriteState(!isFavoriteState);
    } catch {
      throw new Error('Error postFavoriteOfferAction2');
    } finally {
      switchButton(addFavoriteButton.current, false);
    }
  }

  function onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    handleClick();
  }

  return (
    <button
      ref={addFavoriteButton}
      className={
        clsx(
          'offer__bookmark-button button',
          { 'offer__bookmark-button--active': isFavoriteState })
      }
      type='button'
      onClick={onClick}
    >
      <svg className='offer__bookmark-icon' width='31' height='33'>
        <use xlinkHref='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden'>To bookmarks</span>
    </button>
  );
}

export { OfferBookmark };
