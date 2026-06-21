import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { LoginForm } from './login-form';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { loginAction } from '../../store/api-actions';
import { setErrorType } from '../../store/action';
import { AppRoute, TYPE_OF_ERROR } from '../../const';
import { getErrorType } from '../../store/selectors/error-slice';

// Мокаем хуки Redux
vi.mock('../../hooks/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../../store/api-actions', () => ({
  loginAction: vi.fn(),
}));

vi.mock('../../store/action', () => ({
  setErrorType: vi.fn(),
}));

// Мокаем useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LoginForm', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Используем vi.mocked для типизации моков
    const mockedUseAppDispatch = vi.mocked(useAppDispatch);
    mockedUseAppDispatch.mockReturnValue(mockDispatch);

    const mockedUseAppSelector = vi.mocked(useAppSelector);
    mockedUseAppSelector.mockImplementation((selector) => {
      // Просто проверяем, является ли selector функцией с именем getErrorType
      if (selector.name === 'getErrorType') {
        return null;
      }
      return null;
    });

  });

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
  };

  it('renders form fields and submit button', () => {
    renderComponent();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('disables submit button initially when fields are empty', () => {
    renderComponent();
    const button = screen.getByRole('button', { name: /sign in/i });
    expect(button).toBeDisabled();
  });

  it('enables submit button when both fields are valid', async () => {
    const user = userEvent.setup();
    renderComponent();

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const button = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'Password123');

    await waitFor(() => expect(button).not.toBeDisabled());
  });

  it('displays email error when email is invalid and field loses focus', async () => {
    const user = userEvent.setup();
    renderComponent();

    const emailInput = screen.getByPlaceholderText('Email');
    await user.type(emailInput, 'invalid-email');
    await user.tab();

    expect(setErrorType).toHaveBeenCalledWith(TYPE_OF_ERROR.ERROR_LOGIN_EMAIL);
  });

  it('displays password error when password is invalid and field loses focus', async () => {
    const user = userEvent.setup();
    renderComponent();

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '123');
    await user.tab();

    expect(setErrorType).toHaveBeenCalledWith(TYPE_OF_ERROR.ERROR_LOGIN_PASSWORD);
  });

  it('submits form with valid data and navigates to main page', async () => {
    const user = userEvent.setup();
    const unwrapMock = vi.fn().mockResolvedValue(undefined);
    mockDispatch.mockReturnValue({ unwrap: unwrapMock });

    renderComponent();

    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'ValidPass123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(loginAction).toHaveBeenCalledWith({
      login: 'test@example.com',
      password: 'ValidPass123',
    });

    await waitFor(() => {
      expect(unwrapMock).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith(AppRoute.Main);
    });
  });

  it('shows error when login fails and remains on login page', async () => {
    const user = userEvent.setup();
    const unwrapMock = vi.fn().mockRejectedValue(new Error('Invalid credentials'));
    mockDispatch.mockReturnValue({ unwrap: unwrapMock });

    renderComponent();

    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'ValidPass123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(setErrorType).toHaveBeenCalledWith(TYPE_OF_ERROR.ERROR_LOGIN);
      expect(mockNavigate).not.toHaveBeenCalled(); // ← навигации не было
    });
  });

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup();
    let resolvePromise: (value: unknown) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    const unwrapMock = vi.fn().mockReturnValue(promise);
    mockDispatch.mockReturnValue({ unwrap: unwrapMock });

    renderComponent();

    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'ValidPass123');

    const button = screen.getByRole('button', { name: /sign in/i });
    await user.click(button);

    // Ожидаем, что кнопка станет disabled и текст изменится
    await waitFor(() => {
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent(/Signing in.../i);
    });

    resolvePromise!(undefined);
    await waitFor(() => {
      expect(button).not.toBeDisabled();
      expect(button).toHaveTextContent(/sign in/i);
    });
  });

  it('shows error message when errorType is present', () => {
    const mockedUseAppSelector = vi.mocked(useAppSelector);
    mockedUseAppSelector.mockImplementation((selector) => {
      if (selector === getErrorType) { // сравнение по ссылке
        return TYPE_OF_ERROR.ERROR_LOGIN;
      }
      return null;
    });
    renderComponent();
    expect(screen.getByTestId('message')).toBeInTheDocument();
  });
});
