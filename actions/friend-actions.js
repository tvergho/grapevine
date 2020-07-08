/* eslint-disable import/no-cycle */
import { ActionTypes } from 'actions';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'https://03q30dqfqi.execute-api.us-east-2.amazonaws.com/dev';

export function getFriends() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FRIENDS_LOADING, payload: true });

    SecureStore.getItemAsync('accessToken').then((token) => {
      fetch(`${API_URL}/friends`, { method: 'GET', headers: { Authorization: `Bearer ${token}` } })
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: ActionTypes.SET_FRIENDS, payload: json.friends });
        })
        .catch((error) => { console.log(error); })
        .finally(() => { dispatch({ type: ActionTypes.FRIENDS_LOADING, payload: false }); });
    });
  };
}

export function getFriendRequests() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.REQUESTS_LOADING, payload: true });

    SecureStore.getItemAsync('accessToken').then((token) => {
      fetch(`${API_URL}/request`, { method: 'GET', headers: { Authorization: `Bearer ${token}` } })
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: ActionTypes.SET_REQUESTS, payload: json.friend_requests });
        })
        .catch((error) => { console.log(error); })
        .finally(() => { dispatch({ type: ActionTypes.REQUESTS_LOADING, payload: false }); });
    });
  };
}
