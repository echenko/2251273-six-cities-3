// Import React
import { Navigate } from 'react-router-dom';
// Import Constants
import { AuthorizationStatus, AppRoute } from '../../const';

// Create Types
type PrivateProps = {
  statusAuthorization: AuthorizationStatus;
  children: JSX.Element;
}

// Check Auth
const checkAuth = (statusAuthorization: AuthorizationStatus): boolean => statusAuthorization === AuthorizationStatus.Auth;

// Create Private
function Private({statusAuthorization, children}: PrivateProps): JSX.Element {
  return (
    checkAuth(statusAuthorization) ? children : <Navigate to={AppRoute.Login} />
  );
}

// Export Private
export { Private };
