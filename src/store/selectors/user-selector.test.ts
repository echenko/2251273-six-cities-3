import { NameSpace } from '../../const';
import { getAuthorizationStatus, getAuthCheckedStatus, getUserEmail, getUserAvatar } from './user-selector';
import { AuthorizationStatus } from '../../const';

describe('get authorization status', () => {

  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userEmail: null,
      userAvatar: null,
    },
  };

  it('should return authorization status', () => {

    const result = getAuthorizationStatus(state);

    expect(result).toBe(AuthorizationStatus.NoAuth);
  });

  it('should return authorization status', () => {

    const result = getAuthCheckedStatus(state);

    expect(result).toBe(false);
  });

  it('should return user email', () => {

    const result = getUserEmail(state);

    expect(result).toBe(null);
  });

  it('should return user avatar', () => {

    const result = getUserAvatar(state);

    expect(result).toBe(null);
  });
});

describe('get authorization status', () => {

  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      userEmail: 'oBtXg@example.com',
      userAvatar: 'https://via.placeholder.com/150',
    },
  };

  it('should return authorization status', () => {

    const result = getAuthorizationStatus(state);

    expect(result).toBe(AuthorizationStatus.Auth);
  });

  it('should return authorization status', () => {

    const result = getAuthCheckedStatus(state);

    expect(result).toBe(true);
  });

  it('should return user email', () => {

    const result = getUserEmail(state);

    expect(result).toBe('oBtXg@example.com');
  });

  it('should return user avatar', () => {

    const result = getUserAvatar(state);

    expect(result).toBe('https://via.placeholder.com/150');
  });
});
