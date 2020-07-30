/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
import * as SecureStore from 'expo-secure-store';
import Auth0 from 'react-native-auth0';
import { ActionTypes } from 'actions';
import auth from '@react-native-firebase/auth';

const auth0 = new Auth0({ domain: 'dev-recroom.us.auth0.com', clientId: 'UMh55ELLqvogWbyKGrcivBO6TpFm0PEI' });
const API_URL = 'https://api.bobame.app';

// Todo: Facebook, confirm phone number, send email verification.

function getError(error) {
  if (!error || error === undefined) return 'There was an error.';
  else if (error.code) return handleFirebaseError(error);
  else if (error.message) return error.message;
  else if (error.json && error.json.error_description) return error.json.error_description;
  else return error;
}

function handleFirebaseError({ code }) {
  switch (code) {
  case 'auth/weak-password':
    return 'Password is too weak.';
  case 'auth/email-already-in-use':
    return 'Email is already in use by another user.';
  case 'auth/invalid-email':
    return 'Invalid email.';
  default:
    return 'There was an error completing this request.';
  }
}

// Upon user registration, adds the user's info to the BobaMe database.
function addToDatabase(token, user) {
  const {
    firstName, lastName, phone, photoURL,
  } = user;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify({
      firstName,
      lastName,
      phone,
      picture: photoURL,
    }),
  };

  fetch(`${API_URL}/users`, options)
    .then(() => { console.log('wrote to database'); })
    .catch((error) => { console.log(error); });
}

// Native sign up cycle.
export function signUpUserFirebase(userData, navigation) {
  const {
    firstName, lastName, email, phone, password,
  } = userData;

  return async (dispatch) => {
    try {
      const { user } = await auth().createUserWithEmailAndPassword(email, password);
      const photoURL = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&size=300&bold=true&background=FFB7B2&color=FFFFFF`;

      const profile = {
        displayName: firstName,
        photoURL,
      };
      dispatch({ type: ActionTypes.USER_SIGN_IN, payload: { ...profile, uid: user.uid } });
      await user.updateProfile(profile);

      const token = await user.getIdToken(true);
      addToDatabase(token, { ...userData, photoURL });
    } catch (e) {
      navigation.goBack();
      dispatch({ type: ActionTypes.ERROR, payload: getError(e) });
    }
  };
}

export function authUser(user) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.AUTH_USER });
    if (user) dispatch({ type: ActionTypes.USER_SIGN_IN, payload: user });
  };
}

// Native login cycle.
export function logInUserFirebase(userData, navigation) {
  const { email, password } = userData;

  return async (dispatch) => {
    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);
      const { claims } = await user.getIdTokenResult();

      if (!claims.user) {
        dispatch({ type: ActionTypes.ERROR, payload: 'Not a user account.' });
        dispatch(signOut());
      }
    } catch (e) {
      navigation.goBack();
      dispatch({ type: ActionTypes.ERROR, payload: getError(e) });
    }
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

export function refreshUserInfo() {
  if (auth().currentUser) auth().currentUser.reload();
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
  return (dispatch) => {
    auth().signOut();
    dispatch({ type: ActionTypes.CLEAR_USER });
    dispatch({ type: ActionTypes.DEAUTH_USER });
    dispatch({ type: ActionTypes.APP_LOADED });

    SecureStore.deleteItemAsync('idToken');
    SecureStore.deleteItemAsync('accessToken');
    SecureStore.deleteItemAsync('refreshToken');
  };
}
