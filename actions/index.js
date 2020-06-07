export const ActionTypes = {
  FONTS_LOADED: 'FONTS_LOADED',
  SIGN_UP_USER: 'SIGN_UP_USER',
  AUTH_USER: 'AUTH_USER',
};

export function setFontsLoaded() {
  return {
    type: ActionTypes.FONTS_LOADED,
    payload: null,
  };
}

export function signUpUser(user) {
  return {
    type: ActionTypes.SIGN_UP_USER,
    payload: user,
  };
}

export function authUser() {
  return {
    type: ActionTypes.AUTH_USER,
    payload: null,
  };
}
