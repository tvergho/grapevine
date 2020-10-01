/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { ActionTypes } from 'actions';
import auth from '@react-native-firebase/auth';

const API_URL = __DEV__ ? 'https://api.bobame.app' : 'https://api.rectree.app';
const STATUS = 'pending';

export function getMyRecs() {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.RECS_LOADING, payload: true });
    const token = await auth().currentUser.getIdToken();
    console.log(token);

    fetch(`${API_URL}/recommendation/me`, { method: 'GET', headers: { Authorization: token } })
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: ActionTypes.SET_MY_RECS, payload: json.recommendations });
      })
      .catch((error) => { console.log(error); })
      .finally(() => { dispatch({ type: ActionTypes.RECS_LOADING, payload: false }); });
  };
}

export function getRecs() {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.RECS_LOADING, payload: true });
    const token = await auth().currentUser.getIdToken();

    fetch(`${API_URL}/recommendation?status=${STATUS}`, { method: 'GET', headers: { Authorization: token } })
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: ActionTypes.SET_RECS, payload: json.recommendations });
      })
      .catch((error) => { console.log(error); })
      .finally(() => { dispatch({ type: ActionTypes.RECS_LOADING, payload: false }); });
  };
}

export function getAcceptedRecs() {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.RECS_LOADING, payload: true });
    const token = await auth().currentUser.getIdToken();

    fetch(`${API_URL}/recommendation?status=accepted`, { method: 'GET', headers: { Authorization: token } })
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: ActionTypes.SET_ACCEPTED_RECS, payload: json.recommendations });
      })
      .catch((error) => { console.log(error); })
      .finally(() => { dispatch({ type: ActionTypes.RECS_LOADING, payload: false }); });
  };
}

export function deleteRec(recId) {
  return async (dispatch) => {
    const token = await auth().currentUser.getIdToken();

    dispatch({ type: ActionTypes.DELETE_MY_RECS, payload: recId });
    const options = {
      method: 'DELETE',
      headers: { Authorization: token },
    };

    fetch(`${API_URL}/recommendation?rec_id=${recId}`, options);
  };
}

export function getBusiness(bizId) {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.BUSINESS_LOADING, payload: true });
    const token = await auth().currentUser.getIdToken();

    fetch(`${API_URL}/business?businessId=${bizId}`, { method: 'GET', headers: { Authorization: token } })
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: ActionTypes.SET_BUSINESS, payload: json });
      })
      .catch((error) => { console.log(error); })
      .finally(() => { dispatch({ type: ActionTypes.BUSINESS_LOADING, payload: false }); });
  };
}

export function clearBusiness() {
  return {
    type: ActionTypes.CLEAR_BUSINESS,
  };
}
