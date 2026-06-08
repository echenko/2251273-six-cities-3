import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { APIRoute } from '../const';
import { OffersElementType } from '../types/offers';
import { OfferType } from '../types/offer';
import { FavoriteType } from '../types/favorite';
import { CommentElementType } from '../types/comments';
import { ReviewType } from '../types/review';
import { saveToken, dropToken, getToken } from '../services/token';
import { saveUserEmail, dropUserEmail, getUserEmail } from '../services/user-email';

type AuthData = {
  login: string;
  password: string;
};

export const fetchOffersAction = createAsyncThunk<OffersElementType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OffersElementType[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchNearOffersAction = createAsyncThunk<OffersElementType[], string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchNearOffers',
  async (id, { extra: api }) => {
    const { data } = await api.get<OffersElementType[]>(`${APIRoute.Offer}/${id}/nearby`);
    return data;
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<OffersElementType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchFavoriteOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<FavoriteType[]>(APIRoute.Favorite);
    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<OfferType, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchOffer',
  async (id, { extra: api }) => {
    const { data } = await api.get<OfferType>(`${APIRoute.Offer}/${id}`);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    if (getToken() && getUserEmail()) {
      try {
        await api.get(APIRoute.Login);
      } catch {
        dropToken();
        dropUserEmail();
        throw new Error('Error check authorization user');
      }
    } else {
      dropToken();
      dropUserEmail();
      throw new Error('Error check authorization user');
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { extra: api }) => {
    const { data: { token } } = await api.post<{ token: string }>(APIRoute.Login, { email, password });
    saveToken(token);
    saveUserEmail(email);
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dropUserEmail();
  },
);

export const fetchCommentsOfferAction = createAsyncThunk<CommentElementType[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCommentsOffer',
  async (id, { extra: api }) => {
    const { data } = await api.get<CommentElementType[]>(`${APIRoute.Comments}/${id}`);
    return data;
  },
);

export const postCommentsOfferAction = createAsyncThunk<void, ReviewType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postComment',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    await api.post<ReviewType>(`${APIRoute.Comments}0/${offerId}`, { comment, rating });
    dispatch(fetchCommentsOfferAction(offerId));
  },
);

export const postFavoriteOfferAction = createAsyncThunk<void, { id: string; status: boolean }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postFavoriteOffer',
  async ({id, status}, { dispatch, extra: api }) => {
    await api.post<FavoriteType>(`${APIRoute.Favorite}/${id}/${Number(status)}`);
    dispatch(fetchFavoriteOffersAction());
  },
);
