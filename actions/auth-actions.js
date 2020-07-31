/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
import { ActionTypes } from 'actions';
import auth from '@react-native-firebase/auth';
import {
  LoginManager, AccessToken, GraphRequest, GraphRequestManager,
} from 'react-native-fbsdk';

const API_URL = 'https://api.bobame.app';

// Todo: Confirm phone number, update server authorizer.

// Called to derive an error message from various error objects.
function getError(error) {
  if (!error || error === undefined) return 'There was an error.';
  else if (error.code) return handleFirebaseError(error);
  else if (error.message) return error.message;
  else if (error.json && error.json.error_description) return error.json.error_description;
  else return error;
}

// Returns an error message for common Firebase errors.
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

// Create a Firebase credential for the Facebook user and attempt to log them in.
// If a user account already exists for the given email, direct them to a screen to link their accounts.
function addFacebookUser(error, result, navigation) {
  return async (dispatch) => {
    if (error) {
      navigation.goBack();
      dispatch({ type: ActionTypes.ERROR, payload: getError(error) });
    } else {
      try {
        const tokenData = await AccessToken.getCurrentAccessToken();
        console.log(tokenData);
        const facebookCredential = auth.FacebookAuthProvider.credential(tokenData.accessToken);
        const { user } = await auth().signInWithCredential(facebookCredential);
        const { first_name, last_name, id } = result;

        const photoURL = `https://graph.facebook.com/${id}/picture?width=300&height=300`;
        const profile = {
          displayName: first_name,
          photoURL,
        };
        dispatch({ type: ActionTypes.USER_SIGN_IN, payload: { ...profile, uid: user.uid } });
        await user.updateProfile(profile);

        const token = await user.getIdToken(true);
        addToDatabase(token, { firstName: first_name, lastName: last_name, photoURL });
      } catch (e) {
        // Handle linking.
        if (e.code === 'auth/account-exists-with-different-credential') {
          dispatch({ type: ActionTypes.SET_SIGNUP_STEP, payload: 'link' });
        } else {
          navigation.goBack();
          dispatch({ type: ActionTypes.ERROR, payload: getError(e) });
        }
      }
    }
  };
}

// Link accounts with an existing Firebase user.
export function linkFacebookUser(email, password) {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.SET_SIGNUP_STEP, payload: '' });

    try {
      const { accessToken, userID } = await AccessToken.getCurrentAccessToken();
      const facebookCredential = auth.FacebookAuthProvider.credential(accessToken);

      const { user } = await auth().signInWithEmailAndPassword(email, password);
      await user.linkWithCredential(facebookCredential);

      const photoURL = `https://graph.facebook.com/${userID}/picture?width=300&height=300`;
      const profile = {
        photoURL,
      };
      dispatch({ type: ActionTypes.USER_SIGN_IN, payload: profile });
      await user.updateProfile(profile);

      user.reload();
    } catch (e) {
      dispatch({ type: ActionTypes.SET_SIGNUP_STEP, payload: 'link' });
      dispatch({ type: ActionTypes.ERROR, payload: getError(e) });
    }
  };
}

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
    AccessToken.refreshCurrentAccessTokenAsync();
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

export function refreshUserInfo() {
  if (auth().currentUser) auth().currentUser.reload();
}

export function loginWithFacebookFirebase(navigation) {
  return async (dispatch) => {
    try {
      await LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']);

      const infoRequest = new GraphRequest(
        '/me',
        { parameters: { fields: { string: 'first_name, last_name' } } },
        (error, result) => dispatch(addFacebookUser(error, result, navigation)),
      );

      new GraphRequestManager().addRequest(infoRequest).start();
    } catch (e) {
      navigation.goBack();
      dispatch({ type: ActionTypes.ERROR, payload: getError(e) });
    }
  };
}

export function signOut() {
  return (dispatch) => {
    auth().signOut();
    LoginManager.logOut();
    dispatch({ type: ActionTypes.CLEAR_USER });
    dispatch({ type: ActionTypes.DEAUTH_USER });
    dispatch({ type: ActionTypes.APP_LOADED });
  };
}
