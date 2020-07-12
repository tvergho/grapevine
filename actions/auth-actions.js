/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
import * as SecureStore from 'expo-secure-store';
import Auth0 from 'react-native-auth0';
import { ActionTypes } from 'actions';

const auth0 = new Auth0({ domain: 'dev-recroom.us.auth0.com', clientId: 'UMh55ELLqvogWbyKGrcivBO6TpFm0PEI' });
const API_URL = 'https://api.bobame.app';

function getError(error) {
  if (!error || error === undefined) return 'There was an error.';
  else if (error.message) return error.message;
  else if (error.json && error.json.error_description) return error.json.error_description;
  else return error;
}

// Upon user registration, adds the user's info to the RecRoom database.
function addToDatabase(token) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  };

  fetch(`${API_URL}/users`, options)
    .then((response) => response.json())
    .then((json) => { console.log(json); })
    .catch((error) => { console.log(error); });
}

// Runs after sign up to load the user data and authenticate them.
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

      addToDatabase(token);
    }).catch((error) => { console.log('complete', error); });
  };
}

// Native sign up cycle.
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

// Native login cycle.
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
        SecureStore.setItemAsync('refreshToken', credentials.refreshToken).then(() => { dispatch(refresh()); });

        auth0.auth.userInfo({ token: credentials.accessToken }).then((data) => {
          SecureStore.setItemAsync('id', data.sub);
          addToDatabase(credentials.accessToken);
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

function refresh(useToLogin) {
  return (dispatch) => {
  // Gets a refreshed token to keep the user logged in.
    SecureStore.getItemAsync('refreshToken').then((refreshToken) => {
      if (useToLogin) console.log('refresh', refreshToken);
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          grant_type: 'refresh_token',
          client_id: 'UMh55ELLqvogWbyKGrcivBO6TpFm0PEI',
          refresh_token: refreshToken,
        }),
      };

      fetch('https://dev-recroom.us.auth0.com/oauth/token', options)
        .then((response) => response.json())
        .then((json) => {
          SecureStore.setItemAsync('accessToken', json.access_token)
            .then(() => {
              console.log('accessToken', json.access_token);
              if (useToLogin) dispatch(loginWithToken(json.access_token));
            })
            .catch(() => { dispatch({ type: ActionTypes.APP_LOADED }); });
        }).catch(() => { dispatch({ type: ActionTypes.APP_LOADED }); });
    }).catch(() => { dispatch({ type: ActionTypes.APP_LOADED }); });
  };
}

function loginWithToken(token) {
  return (dispatch) => {
    auth0.auth.userInfo({ token }).then((data) => {
      dispatch({ type: ActionTypes.USER_SIGN_IN, payload: data });
      dispatch({ type: ActionTypes.AUTH_USER });
      dispatch({ type: ActionTypes.APP_LOADED });

      const fbOptions = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      };

      fetch(`${API_URL}/users/refresh`, fbOptions)
        .then((response) => response.json())
        .then((json) => { console.log(json); })
        .catch((error) => { console.log(error); });
    }).catch(() => { dispatch({ type: ActionTypes.APP_LOADED }); });
  };
}

// Check to see if the user is logged in on app start.
export function tryAuth0OnStart() {
  return (dispatch) => {
    SecureStore.getItemAsync('accessToken').then((token) => {
      auth0.auth.userInfo({ token }).then((data) => {
        dispatch(refresh());

        dispatch({ type: ActionTypes.USER_SIGN_IN, payload: data });
        dispatch({ type: ActionTypes.AUTH_USER });

        const fbOptions = {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        };

        fetch(`${API_URL}/users/refresh`, fbOptions)
          .then((response) => response.json())
          .then((json) => { console.log(json); })
          .catch((error) => { console.log(error); });

        setTimeout(() => { dispatch({ type: ActionTypes.APP_LOADED }); }, 500);
      }).catch(() => { dispatch(refresh(true)); });
    }).catch(() => { dispatch({ type: ActionTypes.APP_LOADED }); });
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
        SecureStore.setItemAsync('refreshToken', credentials.refreshToken).then(() => { dispatch(refresh()); });
        addToDatabase(credentials.accessToken);

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
