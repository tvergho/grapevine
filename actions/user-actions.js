/* eslint-disable import/no-cycle */
import { ActionTypes, getError } from 'actions';
import auth from '@react-native-firebase/auth';
import getFileData from 'utils/getFileData';

const API_URL = __DEV__ ? 'https://api.bobame.app' : 'https://api.rectree.app';
const BUCKET_URL = 'https://bobame-photos.s3.us-east-2.amazonaws.com';

// Updates a user's profile information.
export function updateUserInfo(patch, callback) {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.USER_SIGN_IN, payload: patch });
    const token = await auth().currentUser.getIdToken();

    const params = {
      method: 'PUT',
      headers: { Authorization: token },
      body: JSON.stringify(patch),
    };

    fetch(`${API_URL}/users`, params)
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          dispatch({ type: ActionTypes.ERROR, payload: getError(json.error) });
        } else {
          callback();
        }
      })
      .catch((error) => { dispatch({ type: ActionTypes.ERROR, payload: getError(error) }); });
  };
}

// Retrieves the most recent version of the user's info from the database.
export function getUserInfo(user) {
  return (dispatch) => {
    user.getIdToken().then((token) => {
      console.log(token);
      fetch(`${API_URL}/users`, { method: 'GET', headers: { Authorization: token } })
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: ActionTypes.USER_SIGN_IN, payload: json });

          const { firstName, photoURL } = json;
          const profile = {
            displayName: firstName,
            photoURL,
          };

          user.updateProfile(profile);
        })
        .finally(() => {
          dispatch({ type: ActionTypes.AUTH_USER });
          dispatch({ type: ActionTypes.APP_LOADED });
        });
    });
  };
}

// Uploads the provided photo and returns the URL.
export function updatePhoto(photo, callback) {
  return async (dispatch) => {
    const { extension, fileType } = getFileData(photo);
    const token = await auth().currentUser.getIdToken();

    const params = {
      method: 'post',
      headers: { Authorization: token },
      body: JSON.stringify({ extension, fileType }),
    };

    const response = await fetch(`${API_URL}/users/photo`, params);
    const json = await response.json();
    const { uploadURL, filename } = json;

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', uploadURL);
    xhr.setRequestHeader('Content-Type', fileType);
    xhr.send({ uri: photo, type: fileType, name: filename });

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          callback(`${BUCKET_URL}/${filename}`);
        } else {
          console.log('Error while sending the image to S3');
          dispatch({ type: ActionTypes.ERROR, payload: 'Error uploading your profile picture.' });
        }
      }
    };
  };
}
