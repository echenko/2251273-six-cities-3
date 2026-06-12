import { LoginForm } from './login-form';
import { useAppSelector } from '../../hooks/hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate } from 'react-router-dom';

function Login(): JSX.Element {
  const statusAuthorization = useAppSelector((state) => state.USER.authorizationStatus);
  if (statusAuthorization === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }
  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <LoginForm />
    </section>
  );
}

export { Login };
