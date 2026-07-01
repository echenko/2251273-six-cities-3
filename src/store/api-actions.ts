import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, TYPE_OF_ERROR } from '../const';
import { AppDispatch, State } from '../types/state';
import { OffersElementType } from '../types/offers';
import { OfferType } from '../types/offer';
import { FavoriteType } from '../types/favorite';
import { CommentElementType } from '../types/comments';
import { ReviewType } from '../types/review';
import { saveToken, dropToken, getToken } from '../services/token';
import { AuthDataType } from '../types/api-action';
import { setErrorType} from '../store/action';

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
  async (_arg, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<OffersElementType[]>(APIRoute.Offers);
      return data;
    } catch (error) {
      dispatch(setErrorType(TYPE_OF_ERROR.ERROR_LOADING_OFFERS));
      return rejectWithValue(error);
    }
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

export const checkAuthAction = createAsyncThunk<AuthDataType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api, rejectWithValue }) => {
    const token = getToken();
    if (!token) {
      return rejectWithValue(null);
    }
    try {
      const response = await api.get<{ email: string; avatarUrl: string }>(APIRoute.Login, { headers: { 'x-token': token } });
      return response.data;
    } catch {
      dropToken();
      return rejectWithValue(null);
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<{ token: string }>(APIRoute.Login, { email, password });
    saveToken(token);
    await dispatch(checkAuthAction()).unwrap();
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
  },
);

export const fetchCommentsOfferAction = createAsyncThunk<CommentElementType[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comments/fetchCommentsOffer',
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
  'comments/postComment',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    await api.post<ReviewType>(`${APIRoute.Comments}/${offerId}`, { comment, rating });
    await dispatch(fetchCommentsOfferAction(offerId));
  },
);

export const postFavoriteOfferAction = createAsyncThunk<FavoriteType, { id: string; status: boolean }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorite/postFavoriteOffer',
  async ({id, status}, { dispatch, extra: api }) => {
    const { data } = await api.post<FavoriteType>(`${APIRoute.Favorite}/${id}/${Number(status)}`);
    dispatch(fetchFavoriteOffersAction());
    return data;
  },
);
