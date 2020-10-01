/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { ActionTypes, getMyRecs } from 'actions';
import auth from '@react-native-firebase/auth';

const API_URL = __DEV__ ? 'https://api.bobame.app' : 'https://api.rectree.app';

export function makeRec(business_id, business_name, message, callback) {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.POST_LOADING });
    const token = await auth().currentUser.getIdToken();

    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json', Authorization: token },
      body: JSON.stringify({
        message,
        business_id,
        business_name,
      }),
    };

    fetch(`${API_URL}/recommendation`, options)
      .then((response) => { callback(); })
      .catch((error) => { console.log(error); })
      .finally(() => {
        dispatch({ type: ActionTypes.POST_LOADING_STOP });
        setTimeout(() => { dispatch(getMyRecs()); }, 1000);
      });
  };
}

export function acceptRec(recommendationID) {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.ACCEPT_REC, payload: recommendationID });
    const token = await auth().currentUser.getIdToken();

    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json', Authorization: token },
      body: JSON.stringify({
        recommendationID,
      }),
    };

    fetch(`${API_URL}/recommendation/accept`, options);
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
