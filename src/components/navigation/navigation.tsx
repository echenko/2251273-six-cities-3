import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/hooks';
import { AuthorizationStatus } from '../../const';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/hooks';
import { getUserEmail } from '../../services/user-email';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import { useEffect } from 'react';

function Navigation(): JSX.Element {
  const statusAuthorization: AuthorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);
  const userEmail = getUserEmail();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favoritesOffers = useAppSelector((state) => state.OFFERS.favoriteOffers);

  useEffect(() => {
    if (statusAuthorization === AuthorizationStatus.Auth) {
      fetchFavoriteOffersAction();
    }
  }, [statusAuthorization, dispatch]);

  function handleLinkClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
    event.preventDefault();
    if (statusAuthorization === AuthorizationStatus.Auth) {
      try {
        dispatch(logoutAction());
        navigate(AppRoute.Main);
      } catch {
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

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
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
            onClick={handleLinkClick}
          >
            <span className="header__signout">{statusAuthorization === AuthorizationStatus.Auth ? 'Sign out' : 'Sign in'}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export {Navigation};
