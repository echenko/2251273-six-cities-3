import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../../store/api-actions';
import { setErrorType } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { AppRoute, TYPE_OF_ERROR, EMAIL_REGEXP, PASSWORD_REGEXP, TIME_OUT_ERROR } from '../../const';
import { switchButton } from '../../utils';
import { Message } from '../message/message';
import { getErrorType } from '../../store/selectors/error-slice';

function LoginForm(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const formButtonSubmit = useRef<HTMLButtonElement | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errorType = useAppSelector(getErrorType);

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
        dispatch(setErrorType(TYPE_OF_ERROR.ERROR_LOGIN));
        navigate(AppRoute.Login);
        throw new Error('Error login');
      } finally {
        setTimeout(() => {
          dispatch(setErrorType(null));
        }, TIME_OUT_ERROR);
        switchButton(formButtonSubmit.current, false);
      }
    }
  }

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    if(loginRef.current?.value && passwordRef.current?.value) {
      onSubmit();
    }
  }

  function checkEmail(): boolean {
    const loginEmail = loginRef.current?.value;
    if (loginEmail && EMAIL_REGEXP.test(loginEmail)) {
      dispatch(setErrorType(null));
      loginRef.current?.setAttribute('style', 'border: 2px solid #000000; outline: none;');
      return true;
    } else {
      dispatch(setErrorType(TYPE_OF_ERROR.ERROR_LOGIN_EMAIL));
      loginRef.current?.setAttribute('style', 'border: 2px solid #FF9000; outline: none;');
      return false;
    }
  }

  function checkPassword (): boolean {
    const loginPassword = passwordRef.current?.value;
    if (loginPassword && PASSWORD_REGEXP.test(loginPassword)) {
      dispatch(setErrorType(null));
      passwordRef.current?.setAttribute('style', 'border: 2px solid #000000; outline: none;');
      return true;
    } else {
      dispatch(setErrorType(TYPE_OF_ERROR.ERROR_LOGIN_PASSWORD));
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
    <form className="login__form form" action="#" method="post" autoComplete='off' >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          ref={loginRef}
          onChange={checkForm}
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          autoComplete='new-password'
          required
          ref={passwordRef}
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
      {errorType && <Message />}
    </form>
  );
}

export {LoginForm};
