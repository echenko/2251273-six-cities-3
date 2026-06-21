import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Login } from './login';
import { AuthorizationStatus, AppRoute } from '../../const';

// Мокаем дочерний компонент LoginForm
vi.mock('./login-form', () => ({
  LoginForm: () => <div data-testid="login-form">Login Form</div>,
}));

// Мокаем Navigate
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    Navigate: ({ to }: { to: string }) => <div data-testid="navigate">{to}</div>,
  };
});

// Определяем тип состояния для USER (можно импортировать из реального кода)
interface UserState {
  authorizationStatus: AuthorizationStatus;
}

function renderWithStatus(status: AuthorizationStatus) {
  const store = configureStore({
    reducer: {
      USER: (state: UserState = { authorizationStatus: status }): UserState => state,
    },
  });

  // остальной код


  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );
}

describe('Component: Login', () => {
  test('should render LoginForm when status is NoAuth', () => {
    renderWithStatus(AuthorizationStatus.NoAuth);
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument();
  });

  test('should redirect to Main when status is Auth', () => {
    renderWithStatus(AuthorizationStatus.Auth);
    expect(screen.getByTestId('navigate')).toHaveTextContent(AppRoute.Main);
    expect(screen.queryByTestId('login-form')).not.toBeInTheDocument();
  });
});
