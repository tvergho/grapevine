/* eslint-disable import/no-cycle */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import auth from '@react-native-firebase/auth';
import { ActionTypes } from 'actions';

const API_URL = __DEV__ ? 'https://api.bobame.app' : 'https://api.rectree.app';

export async function addAccountToken({ public_token, last4, bankName }, callback, isSandbox) {
  const token = await auth().currentUser.getIdToken();

  const requestOptions = {
    method: 'POST',
    headers: { 'content-type': 'application/json', Authorization: token },
    body: JSON.stringify({
      public_token,
      last4,
      bankName,
    }),
  };

  fetch(`${API_URL}/users/payment?sandbox=${isSandbox ? 'true' : 'false'}`, requestOptions).then(() => { if (callback) callback(); });
}

export function setPaymentLoading(loading) {
  return { type: ActionTypes.SET_PAYMENT_LOADING, payload: loading };
}

export function getAccounts(isSandbox) {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.SET_PAYMENT_LOADING, payload: true });
    const token = await auth().currentUser.getIdToken();

    const requestOptions = {
      method: 'GET',
      headers: { 'content-type': 'application/json', Authorization: token },
    };

    fetch(`${API_URL}/users/payment?sandbox=${isSandbox ? 'true' : 'false'}`, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (!json.error) dispatch({ type: ActionTypes.SET_ACCOUNTS, payload: json.accounts });
      })
      .catch((error) => { console.log(error); })
      .finally(() => {
        dispatch({ type: ActionTypes.SET_PAYMENT_LOADING, payload: false });
      });
  };
}

export function getLinkToken(isSandbox) {
  return async (dispatch) => {
    const token = await auth().currentUser.getIdToken();

    const requestOptions = {
      method: 'GET',
      headers: { 'content-type': 'application/json', Authorization: token },
    };

    fetch(`${API_URL}/users/payment/link?sandbox=${isSandbox ? 'true' : 'false'}`, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: ActionTypes.SET_LINK_TOKEN, payload: json.link_token });
      })
      .catch((error) => { console.log(error); });
  };
}

export function deleteAccount(accountId, isSandbox) {
  return async (dispatch) => {
    const token = await auth().currentUser.getIdToken();

    const requestOptions = {
      method: 'DELETE',
      headers: { 'content-type': 'application/json', Authorization: token },
    };

    fetch(`${API_URL}/users/payment/?sandbox=${isSandbox ? 'true' : 'false'}&accountId=${accountId}`, requestOptions);

    dispatch({ type: ActionTypes.DELETE_ACCOUNT, payload: accountId });
  };
}
