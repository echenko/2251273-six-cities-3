import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { OfferType } from '../../types/offer';

export const getCheckedEmptyOffers = (state: State): boolean => !state[NameSpace.Offers].offers.length;
export const getOffers = (state: State): OfferType[] => state[NameSpace.Offers].offers;
export const getOffersLoadingStatus = (state: State): boolean | null => state[NameSpace.Offers].offersLoadingStatus;
