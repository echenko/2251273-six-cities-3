import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { logoutAction, fetchFavoriteOffersAction, checkAuthAction } from '../../store/api-actions';
import { useEffect, memo, useRef } from 'react';
import { getUserEmail, getUserAvatar, getAuthorizationStatus } from '../../store/selectors/user-selector';
import { getFavoriteOffers } from '../../store/selectors/offers-slice';

function Navigation(): JSX.Element {
  const statusAuthorization = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector(getUserEmail);
  const userAvatar = useAppSelector(getUserAvatar);
  const userAvatarRef = useRef<HTMLDivElement | null>(null);
  const favoritesOffers = useAppSelector(getFavoriteOffers);

  useEffect(() => {
    if (statusAuthorization === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffersAction());
    }
  }, [statusAuthorization, dispatch]);

  async function handleLinkClick(): Promise<void> {
    if (statusAuthorization === AuthorizationStatus.Auth) {
      try {
        await dispatch(logoutAction()).unwrap();
        navigate(AppRoute.Main);
      } catch {
        dispatch(checkAuthAction());
        throw new Error('Error logout');
      }
    } else if (statusAuthorization === AuthorizationStatus.NoAuth) {
      try {
        navigate(AppRoute.Login);
      } catch {
        throw new Error('Error login');
      }
    }
  }

  function onLinkClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
    event.preventDefault();
    handleLinkClick();
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper" ref={userAvatarRef}>
              {userAvatar && <img className="header__avatar user__avatar" src={userAvatar} width="31" height="31" alt="User avatar" />}
            </div>
            { statusAuthorization === AuthorizationStatus.Auth &&
              <span className="header__user-name user__name">{userEmail}</span>}
            {statusAuthorization === AuthorizationStatus.Auth &&
              <span className="header__favorite-count">{favoritesOffers.length}</span>}
          </Link>
        </li>
        <li className="header__nav-item">
          <Link
            className="header__nav-link" to={AppRoute.Login}
            onClick={onLinkClick}
          >
            <span className="header__signout">{statusAuthorization === AuthorizationStatus.Auth ? 'Sign out' : 'Sign in'}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const NavigationMemo = memo(Navigation);

export { NavigationMemo as Navigation };
