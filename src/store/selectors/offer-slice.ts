import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { OfferType } from '../../types/offer';
import { CommentElementType } from '../../types/comments';

export const getSelectedOffer = (state: Pick<State, NameSpace.Offer>): OfferType | null => state[NameSpace.Offer].selectedOffer;
export const getSelectedOfferLoadingStatus = (state: Pick<State, NameSpace.Offer>): boolean | null => state[NameSpace.Offer].selectedOfferLoadingStatus;
export const getSelectedOfferComments = (state: Pick<State, NameSpace.Offer>): CommentElementType[] => state[NameSpace.Offer].selectedOfferComments;
export const getSelectedOfferCommentsLoadingStatus = (state: Pick<State, NameSpace.Offer>): boolean | null => state[NameSpace.Offer].selectedOfferCommentsLoadingStatus;
