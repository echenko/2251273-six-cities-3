import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { TYPE_OF_ERROR } from '../../const';

export const checkErrorEmptyOffers = (state: State): boolean => state[NameSpace.Error].errorType === TYPE_OF_ERROR.ERROR_EMPTY_OFFERS && state[NameSpace.Offers].offersLoadingStatus === true;
export const getErrorType = (state: State): string | null => state[NameSpace.Error].errorType;
