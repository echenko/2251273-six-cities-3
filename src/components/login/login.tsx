// Import Components
import { LoginForm } from './login-form';

// Create Login
function Login(): JSX.Element {
  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <LoginForm />
    </section>
  );
}

// Export Login
export { Login };
