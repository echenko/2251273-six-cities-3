// Import React
import { Link } from 'react-router-dom';
// Import Components
import { Login } from '../components/login/login';
// Import Constants
import { AppRoute } from '../const';

// Create LoginPage
function LoginPage(): JSX.Element {
  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <Login />
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            {/* TODO: Correct path! */}
            <Link className="locations__item-link" to={`${AppRoute.Main}?city=amsterdam`}>
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
