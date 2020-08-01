/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { ActionTypes } from 'actions';
import auth from '@react-native-firebase/auth';

const API_URL = 'https://api.bobame.app';

export function makeRec(business_id, message, callback) {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.POST_LOADING });
    const token = await auth().currentUser.getIdToken();

    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json', Authorization: token },
      body: JSON.stringify({
        message,
        business_id,
      }),
    };
    console.log(options);

    fetch(`${API_URL}/recommendation`, options)
      .then((response) => { callback(); })
      .catch((error) => { console.log(error); })
      .finally(() => { dispatch({ type: ActionTypes.POST_LOADING_STOP }); });
  };
}

export async function makeFriendRequest(userId) {
  const token = await auth().currentUser.getIdToken();

  const requestOptions = {
    method: 'POST',
    headers: { Authorization: token },
    body: JSON.stringify({
      ToUserID: userId,
    }),
  };

  fetch(`${API_URL}/users/request`, requestOptions);
}

export async function deleteFriendRequest(userId) {
  const token = await auth().currentUser.getIdToken();

  const requestOptions = {
    method: 'DELETE',
    headers: { 'content-type': 'application/json', Authorization: token },
    body: JSON.stringify({
      toUserId: userId,
    }),
  };

  fetch(`${API_URL}/users/request`, requestOptions);
}
