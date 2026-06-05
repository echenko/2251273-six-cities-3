import { Link } from 'react-router-dom';
import { Login } from '../components/login/login';
import { AppRoute } from '../const';

function LoginPage(): JSX.Element {
  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <Login />
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to={`${AppRoute.Main}`}>
              <span>Amsterdam</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

// Export LoginPage
export {LoginPage};
