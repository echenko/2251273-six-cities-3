import { Link } from 'react-router-dom';
import { Login } from '../components/login/login';
import { AppRoute } from '../const';
import { CITIES } from '../const';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { changeCity } from '../store/action';


function LoginPage(): JSX.Element {
  function getRandomCity (): string {
    return CITIES[Math.floor(Math.random() * CITIES.length)];
  }

  const city = getRandomCity();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeCity(city));
  }, [city, dispatch]);


  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <Login />
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to={`${AppRoute.Main}`}>
              <span>{city}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export {LoginPage};
