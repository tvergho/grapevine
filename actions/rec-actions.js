/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { ActionTypes } from 'actions';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'https://03q30dqfqi.execute-api.us-east-2.amazonaws.com/dev';

export function getMyRecs() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.RECS_LOADING, payload: true });

    SecureStore.getItemAsync('accessToken').then((token) => {
      console.log(token);
      fetch(`${API_URL}/recommendation/me?status=active`, { method: 'GET', headers: { Authorization: `Bearer ${token}` } })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          dispatch({ type: ActionTypes.SET_MY_RECS, payload: json.recommendations });
        })
        .catch((error) => { console.log(error); })
        .finally(() => { dispatch({ type: ActionTypes.RECS_LOADING, payload: false }); });
    });
  };
}

export function getRecs() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.RECS_LOADING, payload: true });

    SecureStore.getItemAsync('accessToken').then((token) => {
      console.log(token);
      fetch(`${API_URL}/recommendation?status=active`, { method: 'GET', headers: { Authorization: `Bearer ${token}` } })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          dispatch({ type: ActionTypes.SET_RECS, payload: json.recommendations });
        })
        .catch((error) => { console.log(error); })
        .finally(() => { dispatch({ type: ActionTypes.RECS_LOADING, payload: false }); });
    });
  };
}

export function deleteRec(recId) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.DELETE_MY_RECS, payload: recId });
    SecureStore.getItemAsync('accessToken').then((token) => {
      const options = {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      };

      fetch(`${API_URL}/recommendation?rec_id=${recId}`, options);
    });
  };
}
