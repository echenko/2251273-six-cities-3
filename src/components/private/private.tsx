import { Navigate } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/hooks';

type PrivateProps = {
  children: JSX.Element;
}

const checkAuth = (statusAuthorization: AuthorizationStatus): boolean => statusAuthorization === AuthorizationStatus.NoAuth;

function Private({children}: PrivateProps): JSX.Element {
  const statusAuthorization = useAppSelector((state) => state.USER.authorizationStatus);
  return (
    checkAuth(statusAuthorization) ? <Navigate to={AppRoute.Login}/> : children
  );
}

export { Private };
