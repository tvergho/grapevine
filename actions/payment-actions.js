/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import * as SecureStore from 'expo-secure-store';

const API_URL = 'https://api.bobame.app';

export function addAccountToken(public_token) {
  SecureStore.getItemAsync('accessToken').then((token) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        public_token,
      }),
    };

    fetch(`${API_URL}/users/payment`, requestOptions);
  });
}
