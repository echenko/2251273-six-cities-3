import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth;
export const getUserEmail = (state: State): string | null => state[NameSpace.User].userEmail;
export const getUserAvatar = (state: State): string | null => state[NameSpace.User].userAvatar;
