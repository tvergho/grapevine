/* eslint-disable consistent-return */
import { Platform } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';
import awsConfig from '../aws-exports';

const expoUrlOpener = async (url, redirectUrl) => {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(url, redirectUrl);

  if (type === 'success') {
    await WebBrowser.dismissBrowser();

    if (Platform.OS === 'ios') {
      return Linking.openURL(newUrl);
    }
  }
};

const amplifyConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    urlOpener: expoUrlOpener,
  },
};
const expoScheme = 'recroom://';
let redirectUrl = Linking.makeUrl();
if (redirectUrl.startsWith('exp://1')) {
  redirectUrl += '/--/';
} else
if (!(redirectUrl === expoScheme)) {
  redirectUrl += '/';
}

amplifyConfig.oauth.redirectSignIn = redirectUrl;
amplifyConfig.oauth.redirectSignOut = redirectUrl;

Amplify.configure(amplifyConfig);

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

// Lifecycle
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

export function resetLoading() {
  return {
    type: ActionTypes.RESET_LOADING,
  };
}

// Normal sign in flow
export function signUpUser(user, navigation) {
  const {
    firstName, lastName, email, phone, password, profilePic, fbToken,
  } = user;
  const name = `${firstName} ${lastName}`;
  const preferredUsername = `${firstName}-${lastName}`;

  return (dispatch) => {
    dispatch({ type: ActionTypes.LOADING });
    Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        phone_number: phone.length > 0 ? `+${phone}` : '',
        name,
        preferred_username: preferredUsername,
        'custom:first_name': firstName,
        'custom:last_name': lastName,
        'custom:profile_pic': profilePic && profilePic.length > 0 ? profilePic : '',
      },
      clientMetadata: {
        token: fbToken && fbToken.length > 0 ? fbToken : '',
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
        console.log(error);
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
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch({ type: ActionTypes.APP_LOADED });
      });
  };
}

// Facebook sign in flow
export function signUpWithFacebook(token, navigation, expires) {
  const fields = 'first_name,last_name,email';

  return (dispatch) => {
    dispatch({ type: ActionTypes.LOADING });
    SecureStore.setItemAsync('fbtoken', token);

    fetch(`${ROOT_URL}/me?fields=${fields}&access_token=${token}`).then((result) => {
      result.json().then((fieldResult) => {
        if (!fieldResult.error) {
          const imageURL = `${ROOT_URL}/${fieldResult.id}/picture?width=300&height=300`;
          dispatch({ type: ActionTypes.FB_SIGN_IN, payload: { ...fieldResult, imageURL, token } });

          Auth.federatedSignIn({ provider: 'Facebook' }, { token, expires_at: expires }, { name: fieldResult.email })
            .then((cred) => {
              console.log(cred);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          dispatch({ type: ActionTypes.ERROR, payload: fieldResult.error });
          navigation.goBack();
        }
      })
        .catch((error) => {
          dispatch({ type: ActionTypes.ERROR, payload: error.message });
          navigation.goBack();
        })
        .finally(() => {
          dispatch({ type: ActionTypes.RESET_LOADING });
        });
    });
  };
}
