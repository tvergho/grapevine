/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import auth from '@react-native-firebase/auth';

const API_URL = 'https://api.bobame.app';

export async function addAccountToken(public_token) {
  const token = await auth().currentUser.getIdToken();

  const requestOptions = {
    method: 'POST',
    headers: { 'content-type': 'application/json', Authorization: token },
    body: JSON.stringify({
      public_token,
    }),
  };

  fetch(`${API_URL}/users/payment`, requestOptions);
}
