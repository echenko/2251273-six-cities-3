import { NameSpace, TYPE_OF_ERROR } from '../../const';
import { State } from '../../types/state';
import { ErrorType } from '../../types/error';

export const checkErrorEmptyOffers = (state: Pick<State, NameSpace.Error | NameSpace.Offers>): boolean => state[NameSpace.Error].errorType === TYPE_OF_ERROR.ERROR_EMPTY_OFFERS && state[NameSpace.Offers].offersLoadingStatus === true;

export const getErrorType = (state: Pick<State, NameSpace.Error>): ErrorType | null => state[NameSpace.Error].errorType;
