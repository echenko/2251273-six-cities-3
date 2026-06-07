import { useState } from 'react';
import { clsx } from 'clsx';
import { OffersElementType } from '../../types/offers';
import { postFavoriteOfferAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/hooks';
import { switchButton } from '../../utils';
import { useRef } from 'react';

type CardBookmarkProps = {
  offer: OffersElementType;
}

function CardBookmark({ offer }: CardBookmarkProps): JSX.Element {
  const [isFavoriteState, setIsFavoriteState] = useState(offer.isFavorite);
  const dispatch = useAppDispatch();
  const addFavoriteButton = useRef<HTMLButtonElement | null>(null);

  async function handleClick(): Promise<void> {
    switchButton(addFavoriteButton.current, true);
    try {
      await dispatch(postFavoriteOfferAction({ id: offer.id, status: !isFavoriteState })).unwrap();
      setIsFavoriteState(!isFavoriteState);
    } catch {
      throw new Error('Error postFavoriteOfferAction');
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
          'place-card__bookmark-button button',
          { 'place-card__bookmark-button--active': isFavoriteState }
        )
      }
      type="button"
      onClick={onClick}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

// Export CardBookmark
export { CardBookmark };
