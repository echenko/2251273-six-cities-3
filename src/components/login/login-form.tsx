import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../../store/api-actions';
import { setErrorType } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { AppRoute, TYPE_OF_ERROR, EMAIL_REGEXP, PASSWORD_REGEXP } from '../../const';
import { Message } from '../message/message';
import { getErrorType } from '../../store/selectors/error-slice';

function LoginForm(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errorType = useAppSelector(getErrorType);

  // Валидация полей
  const isEmailValid = EMAIL_REGEXP.test(email);
  const isPasswordValid = PASSWORD_REGEXP.test(password);
  const isFormValid = isEmailValid && isPasswordValid;

  // Обработчики изменения полей
  const handleEmailChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
    // Сбрасываем ошибку, если она была от email
    if (errorType === TYPE_OF_ERROR.ERROR_LOGIN_EMAIL) {
      dispatch(setErrorType(null));
    }
  }, [dispatch, errorType]);

  const handlePasswordChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
    if (errorType === TYPE_OF_ERROR.ERROR_LOGIN_PASSWORD) {
      dispatch(setErrorType(null));
    }
  }, [dispatch, errorType]);

  // Валидация при потере фокуса (для UX)
  const handleBlur = useCallback(() => {
    if (email && !isEmailValid) {
      dispatch(setErrorType(TYPE_OF_ERROR.ERROR_LOGIN_EMAIL));
    } else if (password && !isPasswordValid) {
      dispatch(setErrorType(TYPE_OF_ERROR.ERROR_LOGIN_PASSWORD));
    } else if (isFormValid) {
      dispatch(setErrorType(null));
    }
  }, [email, password, isEmailValid, isPasswordValid, isFormValid, dispatch]);

  // Отправка формы
  const handleSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isEmailValid) {
      dispatch(setErrorType(TYPE_OF_ERROR.ERROR_LOGIN_EMAIL));
      return;
    }
    if (!isPasswordValid) {
      dispatch(setErrorType(TYPE_OF_ERROR.ERROR_LOGIN_PASSWORD));
      return;
    }

    setIsSubmitting(true);

    // Асинхронный вызов без возврата Promise в обработчик
    (async () => {
      try {
        await dispatch(loginAction({ login: email, password })).unwrap();
        navigate(AppRoute.Main);
      } catch {
        dispatch(setErrorType(TYPE_OF_ERROR.ERROR_LOGIN));
        // остаёмся на странице логина
      } finally {
        setIsSubmitting(false);
      }
    })();
  }, [email, password, isEmailValid, isPasswordValid, dispatch, navigate]);

  return (
    <form
      className="login__form form"
      action="#"
      method="post"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmailChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          required
          value={password}
          onChange={handlePasswordChange}
          onBlur={handleBlur}
        />
      </div>
      <button
        className="login__submit form__submit button"
        type="submit"
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>
      {errorType && <Message />}
    </form>
  );
}

export { LoginForm };
