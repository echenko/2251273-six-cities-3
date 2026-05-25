import { loginAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/hooks';
import { useRef } from 'react';
import { AppRoute } from '../../const';
import { useNavigate } from 'react-router-dom';

function LoginForm(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      try {
        dispatch(loginAction({
          login: loginRef.current.value,
          password: passwordRef.current.value
        }));
        navigate(AppRoute.Main);
      } catch {
        throw new Error('Error login');
      }
    }
  }

  return (
    <form className="login__form form" action="#" method="post">
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required ref={loginRef}
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password" name="password"
          placeholder="Password"
          required ref={passwordRef}
        />
      </div>
      <button
        className="login__submit form__submit button"
        type="submit"
        onClick={handleSubmit}
      >
          Sign in
      </button>
    </form>
  );
}

// Export LoginForm
export {LoginForm};
