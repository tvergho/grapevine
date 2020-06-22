/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */

import * as SecureStore from 'expo-secure-store';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({ domain: 'dev-recroom.us.auth0.com', clientId: 'UMh55ELLqvogWbyKGrcivBO6TpFm0PEI' });

export const ActionTypes = {
  FONTS_LOADED: 'FONTS_LOADED',
  SIGN_UP_USER: 'SIGN_UP_USER',
  AUTH_USER: 'AUTH_USER',
  ERROR: 'ERROR',
  RESET_ERROR: 'RESET_ERROR',
  APP_LOADED: 'APP_LOADED',
  LOADING: 'LOADING',
  RESET_LOADING: 'RESET_LOADING',
  CODE_ERROR: 'CODE_ERROR',
  USER_SIGN_IN: 'USER_SIGN_IN',
  DEAUTH_USER: 'DEAUTH_USER',
};

// Lifecycle
function getError(error) {
  if (!error || error === undefined) return 'There was an error.';
  else if (error.message) return error.message;
  else if (error.json && error.json.error_description) return error.json.error_description;
  else return error;
}

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

// Auth0 flow

export function completeSignUpAuth0(token) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.LOADING });
    console.log('complete');
    console.log(token);

    auth0.auth.userInfo({ token }).then((data) => {
      console.log(data);
      dispatch({ type: ActionTypes.USER_SIGN_IN, payload: data });
      dispatch({ type: ActionTypes.AUTH_USER });
      dispatch({ type: ActionTypes.RESET_LOADING });
    }).catch((error) => { console.log('complete', error); });
  };
}

export function signUpUserAuth0(user, navigation) {
  const {
    firstName, lastName, email, phone, password,
  } = user;

  return (dispatch) => {
    dispatch({ type: ActionTypes.LOADING });

    auth0.auth
      .createUser({
        email,
        password,
        connection: 'Username-Password-Authentication',
        metadata: {
          firstName,
          lastName,
          name: `${firstName} ${lastName}`,
          phone,
        },
      })
      .then((result) => {
        SecureStore.setItemAsync('id', `auth0|${result.Id}`);

        dispatch({
          type: ActionTypes.SIGN_UP_USER,
          payload: {
            firstName, lastName, email, phone, password, username: result.Id,
          },
        });

        auth0.auth
          .passwordRealm({
            username: email,
            password,
            realm: 'Username-Password-Authentication',
            scope: 'openid profile email offline_access',
          })
          .then((credentials) => {
            console.log('cred', credentials);
            SecureStore.setItemAsync('idToken', credentials.idToken);
            SecureStore.setItemAsync('accessToken', credentials.accessToken);
            SecureStore.setItemAsync('refreshToken', credentials.refreshToken);
            dispatch(completeSignUpAuth0(credentials.accessToken));
          })
          .catch((error) => {
            navigation.goBack();
            dispatch({ type: ActionTypes.ERROR, payload: getError(error) });
          })
          .finally(() => {
            dispatch({ type: ActionTypes.RESET_LOADING });
          });
      })
      .catch((error) => {
        navigation.goBack();
        dispatch({ type: ActionTypes.ERROR, payload: getError(error) });
        dispatch({ type: ActionTypes.RESET_LOADING });
      });
  };
}

export function logInUserAuth0(user, navigation) {
  const { email, password } = user;

  return (dispatch) => {
    dispatch({ type: ActionTypes.LOADING });

    auth0.auth
      .passwordRealm({
        username: email,
        password,
        realm: 'Username-Password-Authentication',
        scope: 'openid profile email offline_access',
      })
      .then((credentials) => {
        console.log('cred', credentials);
        SecureStore.setItemAsync('idToken', credentials.idToken);
        SecureStore.setItemAsync('accessToken', credentials.accessToken);
        SecureStore.setItemAsync('refreshToken', credentials.refreshToken);

        auth0.auth.userInfo({ token: credentials.accessToken }).then((data) => {
          SecureStore.setItemAsync('id', data.sub);
          dispatch({ type: ActionTypes.USER_SIGN_IN, payload: data });
          dispatch({ type: ActionTypes.AUTH_USER });
          setTimeout(() => { dispatch({ type: ActionTypes.RESET_LOADING }); }, 500);
        })
          .catch((error) => {
            console.log(error.json);
            navigation.goBack();
            dispatch({ type: ActionTypes.ERROR, payload: getError(error) });
          });
      })
      .catch((error) => {
        console.log(error.json);
        navigation.goBack();
        dispatch({ type: ActionTypes.ERROR, payload: getError(error) });
      });
  };
}

export function tryAuth0OnStart() {
  return (dispatch) => {
    SecureStore.getItemAsync('accessToken').then((token) => {
      auth0.auth.userInfo({ token }).then((data) => {
        dispatch({ type: ActionTypes.USER_SIGN_IN, payload: data });
        dispatch({ type: ActionTypes.AUTH_USER });

        const fbOptions = {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        };

        fetch('https://y3i0zwdih5.execute-api.us-east-2.amazonaws.com/refresh', fbOptions);
      })
        .catch((error) => { console.log(error); })
        .finally(() => {
          setTimeout(() => { dispatch({ type: ActionTypes.APP_LOADED }); }, 500);
        });
    }).catch(() => { dispatch({ type: ActionTypes.APP_LOADED }); });

    SecureStore.getItemAsync('refreshToken').then((refreshToken) => {
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          grant_type: 'refresh_token',
          client_id: 'UMh55ELLqvogWbyKGrcivBO6TpFm0PEI',
          refresh_token: refreshToken,
        }),
      };

      fetch('https://dev-recroom.us.auth0.com/oauth/token', options);
    });
  };
}

export function refreshUserInfo() {
  return (dispatch) => {
    SecureStore.getItemAsync('accessToken').then((token) => {
      auth0.auth.userInfo({ token }).then((data) => {
        dispatch({ type: ActionTypes.USER_SIGN_IN, payload: data });
      })
        .catch((error) => { console.log(error); });
    });
  };
}

export function signUpWithFacebookAuth0(navigation) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.LOADING });
    auth0
      .webAuth
      .authorize({ scope: 'openid profile email offline_access', connection: 'facebook' })
      .then((credentials) => {
        console.log('cred', credentials);
        SecureStore.setItemAsync('idToken', credentials.idToken);
        SecureStore.setItemAsync('accessToken', credentials.accessToken);
        SecureStore.setItemAsync('refreshToken', credentials.refreshToken);

        auth0.auth.userInfo({ token: credentials.accessToken }).then((data) => {
          SecureStore.setItemAsync('id', data.sub);
          dispatch({ type: ActionTypes.USER_SIGN_IN, payload: data });
          dispatch({ type: ActionTypes.AUTH_USER });
          setTimeout(() => { dispatch({ type: ActionTypes.RESET_LOADING }); }, 500);
        }).catch((error) => {
          console.log(error.json);
          navigation.goBack();
          dispatch({ type: ActionTypes.RESET_LOADING });
          dispatch({ type: ActionTypes.ERROR, payload: getError(error) });
        });
      })
      .catch((error) => {
        console.log(error.json);
        navigation.goBack();
        dispatch({ type: ActionTypes.RESET_LOADING });
        dispatch({ type: ActionTypes.ERROR, payload: getError(error) });
      });
  };
}

export function signOut() {
  console.log('sign out');

  return (dispatch) => {
    SecureStore.deleteItemAsync('id');
    SecureStore.deleteItemAsync('accessToken');
    SecureStore.deleteItemAsync('idToken');
    SecureStore.deleteItemAsync('refreshToken');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    dispatch({ type: ActionTypes.APP_LOADED });
  };
}
