import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth;
export const getUserEmail = (state: Pick<State, NameSpace.User>): string | null => state[NameSpace.User].userEmail;
export const getUserAvatar = (state: Pick<State, NameSpace.User>): string | null => state[NameSpace.User].userAvatar;
