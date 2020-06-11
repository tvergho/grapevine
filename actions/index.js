const ROOT_URL = 'https://graph.facebook.com';

export const ActionTypes = {
  FONTS_LOADED: 'FONTS_LOADED',
  SIGN_UP_USER: 'SIGN_UP_USER',
  AUTH_USER: 'AUTH_USER',
  FB_SIGN_IN: 'FB_SIGN_IN',
  ERROR: 'ERROR',
  RESET_ERROR: 'RESET_ERROR',
  APP_LOADED: 'APP_LOADED',
};

export function setFontsLoaded() {
  return {
    type: ActionTypes.FONTS_LOADED,
    payload: null,
  };
}

export function setAppLoaded() {
  return {
    type: ActionTypes.APP_LOADED,
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

export function signInFacebook(token) {
  const fields = 'first_name,last_name,email';

  return (dispatch) => {
    fetch(`${ROOT_URL}/me?fields=${fields}&access_token=${token}`).then((result) => {
      result.json().then((fieldResult) => {
        if (fieldResult.error) dispatch({ type: ActionTypes.ERROR, payload: fieldResult.error.message });
        else {
          const imageURL = `${ROOT_URL}/${fieldResult.id}/picture?width=300&height=300`;
          dispatch({ type: ActionTypes.FB_SIGN_IN, payload: { ...fieldResult, imageURL, token } });
        }
      });
    })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR, payload: error.message });
      });
  };
}

export function tryFacebookSignInOnStart(token) {
  const fields = 'first_name,last_name,email';

  return (dispatch) => {
    if (token) {
      fetch(`${ROOT_URL}/me?fields=${fields}&access_token=${token}`).then((result) => {
        result.json().then((fieldResult) => {
          if (!fieldResult.error) {
            const imageURL = `${ROOT_URL}/${fieldResult.id}/picture?width=300&height=300`;
            dispatch({ type: ActionTypes.FB_SIGN_IN, payload: { ...fieldResult, imageURL, token } });
            dispatch({ type: ActionTypes.AUTH_USER });
          }
        })
          .finally(() => {
            dispatch({ type: ActionTypes.APP_LOADED });
          });
      });
    }
  };
}

export function displayError(message) {
  return {
    type: ActionTypes.ERROR,
    payload: message,
  };
}

export function resetError() {
  return {
    type: ActionTypes.RESET_ERROR,
  };
}
