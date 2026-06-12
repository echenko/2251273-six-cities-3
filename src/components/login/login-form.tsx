import { loginAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/hooks';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { switchButton } from '../../utils';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from '../../const';

function LoginForm(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const formButtonSubmit = useRef<HTMLButtonElement | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function onSubmit(): Promise<void> {
    if (loginRef.current !== null && passwordRef.current !== null) {
      switchButton(formButtonSubmit.current, true);
      try {
        await dispatch(loginAction({
          login: loginRef.current.value,
          password: passwordRef.current.value
        })).unwrap();
        navigate(AppRoute.Main);
      } catch {
        navigate(AppRoute.Login);
        throw new Error('Error login');
      } finally {
        switchButton(formButtonSubmit.current, false);
      }
    }
  }

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    onSubmit();
  }

  function checkEmail(): boolean {
    const loginEmail = loginRef.current?.value;
    if (loginEmail && EMAIL_REGEXP.test(loginEmail)) {
      loginRef.current?.setAttribute('style', 'border: 2px solid #000000; outline: none;');
      return true;
    } else {
      loginRef.current?.setAttribute('style', 'border: 2px solid #FF9000; outline: none;');
      return false;
    }
  }

  function checkPassword (): boolean {
    const loginPassword = passwordRef.current?.value;
    if (loginPassword && PASSWORD_REGEXP.test(loginPassword)) {
      passwordRef.current?.setAttribute('style', 'border: 2px solid #000000; outline: none;');
      return true;
    } else {
      passwordRef.current?.setAttribute('style', 'border: 2px solid #FF9000; outline: none;');
      return false;
    }
  }

  function checkForm(): void {
    if (checkEmail() && checkPassword()) {
      formButtonSubmit.current?.removeAttribute('disabled');
    } else {
      formButtonSubmit.current?.setAttribute('disabled', 'disabled');
    }
  }

  return (
    <form className="login__form form" action="#" method="post" autoComplete="off">
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required ref={loginRef}
          onChange={checkForm}
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password" name="password"
          placeholder="Password"
          required ref={passwordRef}
          onChange={checkForm}
        />
      </div>
      <button
        ref={formButtonSubmit}
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
