import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { APIRoute, AuthorizationStatus } from '../const';
import { OffersElementType } from '../types/offers';
import { loadOffers, requireAuthorization, addUserEmail, resetUserEmail } from './action';
import { saveToken, dropToken } from '../services/token';
import { getUserEmail, saveUserEmail, dropUserEmail } from '../services/user-email';

type AuthData = {
  login: string;
  password: string;
};

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<OffersElementType[]>(APIRoute.Offers);
      // TODO: Fix simulation of delay
      setTimeout(() => {
        dispatch(loadOffers(data));
      }, 1000);

    } catch {
      dispatch(loadOffers([]));
    }

  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(addUserEmail(getUserEmail()));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<{token: string}>(APIRoute.Login, {email, password});
    saveToken(token);
    saveUserEmail(email);
    dispatch(addUserEmail(email));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dropUserEmail();
    dispatch(resetUserEmail());
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
