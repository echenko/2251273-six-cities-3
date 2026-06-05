import { LoginForm } from './login-form';
import { useAppSelector } from '../../hooks/hooks';
import { AppRoute } from '../../const';
import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';

function Login(): JSX.Element {
  const statusAuthorization = useAppSelector((state) => state.USER.authorizationStatus);
  if (statusAuthorization === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Favorites} />;
  }
  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <LoginForm />
    </section>
  );
}

export { Login };
