import Amplify, { Auth } from 'aws-amplify';
import awsConfig from '../aws-exports';

Amplify.configure(awsConfig);
Amplify.configure({
  Auth: {
    region: 'us-east-2',
    userPoolId: 'us-east-2_BwpAKgec2',
    userPoolWebClientId: '6ofq62qbmej4d0l1lj5envoasu',
  },
});

const ROOT_URL = 'https://graph.facebook.com';

export const ActionTypes = {
  FONTS_LOADED: 'FONTS_LOADED',
  SIGN_UP_USER: 'SIGN_UP_USER',
  AUTH_USER: 'AUTH_USER',
  FB_SIGN_IN: 'FB_SIGN_IN',
  ERROR: 'ERROR',
  RESET_ERROR: 'RESET_ERROR',
  APP_LOADED: 'APP_LOADED',
  LOADING: 'LOADING',
  RESET_LOADING: 'RESET_LOADING',
  CODE_ERROR: 'CODE_ERROR',
  USER_SIGN_IN: 'USER_SIGN_IN',
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

export function signUpUser(user, navigation) {
  const {
    firstName, lastName, email, phone, password,
  } = user;
  const name = `${firstName} ${lastName}`;
  const preferredUsername = `${firstName}-${lastName}`;
  const username = `${preferredUsername}-${Math.floor(Math.random() * 999999)}`;

  return (dispatch) => {
    dispatch({ type: ActionTypes.LOADING });
    Auth.signUp({
      username,
      password,
      attributes: {
        email,
        phone_number: `+${phone}`,
        name,
        preferred_username: preferredUsername,
        'custom:first_name': firstName,
        'custom:last_name': lastName,
      },
    })
      .then((result) => {
        dispatch({
          type: ActionTypes.SIGN_UP_USER,
          payload: {
            firstName, lastName, email, phone, password, username: result.user.getUsername(),
          },
        });
        dispatch({ type: ActionTypes.RESET_LOADING });
      })
      .catch((error) => {
        navigation.goBack();
        dispatch({ type: ActionTypes.ERROR, payload: error.message });
        dispatch({ type: ActionTypes.RESET_LOADING });
      });
  };
}

export function confirmUser(username, code, callback) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.LOADING });
    Auth.confirmSignUp(username, code)
      .then((result) => {
        callback();
        dispatch({ type: ActionTypes.RESET_LOADING });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.CODE_ERROR, payload: true });
        dispatch({ type: ActionTypes.RESET_LOADING });
      });
  };
}

export function authUser(email, password) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.LOADING });
    Auth.signIn(email, password)
      .then((result) => {
        dispatch({ type: ActionTypes.AUTH_USER });
        dispatch({ type: ActionTypes.RESET_LOADING });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR, payload: error.message });
        dispatch({ type: ActionTypes.RESET_LOADING });
      });
  };
}

export function signInOnStart() {
  return (dispatch) => {
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then((user) => {
        dispatch({ type: ActionTypes.USER_SIGN_IN, payload: user.attributes });
        dispatch({ type: ActionTypes.AUTH_USER });
      })
      .finally(() => {
        dispatch({ type: ActionTypes.APP_LOADED });
      });
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

export function resetCodeError() {
  return {
    type: ActionTypes.CODE_ERROR,
    payload: false,
  };
}
