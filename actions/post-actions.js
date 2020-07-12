/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { ActionTypes } from 'actions';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'https://api.bobame.app';

export function makeRec(business_id, message, callback) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.POST_LOADING });

    SecureStore.getItemAsync('accessToken').then((token) => {
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
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
    });
  };
}

export function makeFriendRequest(userId) {
  SecureStore.getItemAsync('accessToken').then((token) => {
    const requestOptions = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        ToUserID: userId,
      }),
    };

    fetch(`${API_URL}/users/request`, requestOptions);
  });
}

export function deleteFriendRequest(userId) {
  SecureStore.getItemAsync('accessToken').then((token) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        toUserId: userId,
      }),
    };

    fetch(`${API_URL}/users/request`, requestOptions);
  });
}

export function deleteRec(recId) {
  SecureStore.getItemAsync('accessToken').then((token) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    };

    fetch(`${API_URL}/users/request?rec_id=${recId}`, requestOptions);
  });
}
