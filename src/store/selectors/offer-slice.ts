import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { OfferType } from '../../types/offer';
import { CommentElementType } from '../../types/comments';

export const getSelectedOffer = (state: State): OfferType | null => state[NameSpace.Offer].selectedOffer;
export const getSelectedOfferLoadingStatus = (state: State): boolean | null => state[NameSpace.Offer].selectedOfferLoadingStatus;
export const getSelectedOfferComments = (state: State): CommentElementType[] => state[NameSpace.Offer].selectedOfferComments;
export const getSelectedOfferCommentsLoadingStatus = (state: State): boolean | null => state[NameSpace.Offer].selectedOfferCommentsLoadingStatus;
