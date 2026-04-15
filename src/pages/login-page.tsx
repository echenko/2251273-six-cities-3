// Import Components
import { Login } from '../components/login/login';

// Create LoginPage
function LoginPage(): JSX.Element {
  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <Login />
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>Amsterdam</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

// Export LoginPage
export {LoginPage};
