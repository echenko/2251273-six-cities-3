import { OfferType } from '../../types/offer';
import { CommentElementType } from '../../types/comments';

export type OfferSlice = {
  selectedOffer: OfferType | null;
  selectedOfferLoadingStatus: boolean | null;
  selectedOfferComments: CommentElementType[];
  selectedOfferCommentsLoadingStatus: boolean | null;
};
