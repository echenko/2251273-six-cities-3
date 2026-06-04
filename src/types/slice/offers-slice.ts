import { OffersElementType } from '../../types/offers';

export type OffersSlice = {
  offers: OffersElementType[];
  offersLoadingStatus: boolean | null;
  nearOffers: OffersElementType[];
  nearOffersLoadingStatus: boolean | null;
  favoriteOffers: OffersElementType[];
  favoriteOffersLoadingStatus: boolean | null;
};
