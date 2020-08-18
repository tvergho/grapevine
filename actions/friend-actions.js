/* eslint-disable import/no-cycle */
import { ActionTypes } from 'actions';
import auth from '@react-native-firebase/auth';

const API_URL = 'https://api.bobame.app';

export function getFriends() {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.FRIENDS_LOADING, payload: true });

    const token = await auth().currentUser.getIdToken();
    fetch(`${API_URL}/users/friends`, { method: 'GET', headers: { Authorization: token } })
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: ActionTypes.SET_FRIENDS, payload: json.friends });
      })
      .catch((error) => { console.log(error); })
      .finally(() => { dispatch({ type: ActionTypes.FRIENDS_LOADING, payload: false }); });
  };
}

export function getFriendRequests() {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.REQUESTS_LOADING, payload: true });
    const token = await auth().currentUser.getIdToken();

    fetch(`${API_URL}/users/request`, { method: 'GET', headers: { Authorization: token } })
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: ActionTypes.SET_REQUESTS, payload: json.friend_requests });
      })
      .catch((error) => { console.log(error); })
      .finally(() => { dispatch({ type: ActionTypes.REQUESTS_LOADING, payload: false }); });
  };
}

export function deleteFriend(friendId) {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.DELETE_FRIEND, payload: friendId });
    const token = await auth().currentUser.getIdToken();

    const options = {
      method: 'DELETE',
      headers: { 'content-type': 'application/json', Authorization: token },
      body: JSON.stringify({
        to: friendId,
      }),
    };

    fetch(`${API_URL}/users/friends`, options);
  };
}

export async function addFriend(friendId) {
  const token = await auth().currentUser.getIdToken();

  const requestOptions = {
    method: 'POST',
    headers: { 'content-type': 'application/json', Authorization: token },
    body: JSON.stringify({
      to: friendId,
    }),
  };

  fetch(`${API_URL}/users/friends`, requestOptions);
}
