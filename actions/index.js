/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */

import * as SecureStore from 'expo-secure-store';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({ domain: 'dev-recroom.us.auth0.com', clientId: 'UMh55ELLqvogWbyKGrcivBO6TpFm0PEI' });

export const ActionTypes = {
  FONTS_LOADED: 'FONTS_LOADED',
  SIGN_UP_USER: 'SIGN_UP_USER',
  AUTH_USER: 'AUTH_USER',
  ERROR: 'ERROR',
  RESET_ERROR: 'RESET_ERROR',
  APP_LOADED: 'APP_LOADED',
  LOADING: 'LOADING',
  RESET_LOADING: 'RESET_LOADING',
  CODE_ERROR: 'CODE_ERROR',
  USER_SIGN_IN: 'USER_SIGN_IN',
  DEAUTH_USER: 'DEAUTH_USER',
};

// Lifecycle
function getError(error) {
  if (!error || error === undefined) return 'There was an error.';
  else if (error.message) return error.message;
  else if (error.json && error.json.error_description) return error.json.error_description;
  else return error;
}

export function setFontsLoaded() {
  return {
    type: ActionTypes.FONTS_LOADED,
    payload: null,
  };
}

export function setAppLoaded() {
  return {
    type: ActionTypes.APP_LOADED,
    payload: null,
  };
}

export function displayError(message) {
  return {
    type: ActionTypes.ERROR,
    payload: message,
  };
}

export function resetError() {
  return {
    type: ActionTypes.RESET_ERROR,
  };
}

export function resetCodeError() {
  return {
    type: ActionTypes.CODE_ERROR,
    payload: false,
  };
}

export function resetLoading() {
  return {
    type: ActionTypes.RESET_LOADING,
  };
}

// Auth0 flow
export function getManagementToken() {
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: 'yxKSxkJOTEDljuiWo4jJWMCxNz2P41Qp',
      client_secret: 'Oit50WL5ZGwzJW3gYs-qPTp_kmb3b33p5lFOv3R62pLmbacbwZxRuVLnWJrfMEOE',
      audience: 'https://dev-recroom.us.auth0.com/api/v2/',
    }),
  };

  fetch('https://dev-recroom.us.auth0.com/oauth/token', options)
    .then((response) => response.json())
    .then((json) => { SecureStore.setItemAsync('managementToken', json.access_token); })
    .catch((error) => { console.log(error); });
}

export function signUpUserAuth0(user, navigation) {
  const {
    firstName, lastName, email, phone, password,
  } = user;

  return (dispatch) => {
    dispatch({ type: ActionTypes.LOADING });

    auth0.auth
      .createUser({
        email,
        password,
        connection: 'Username-Password-Authentication',
        metadata: {
          firstName,
          lastName,
          name: `${firstName} ${lastName}`,
          phone,
        },
      })
      .then((result) => {
        SecureStore.setItemAsync('id', `auth0|${result.Id}`);
        console.log('result', result);

        dispatch({
          type: ActionTypes.SIGN_UP_USER,
          payload: {
            firstName, lastName, email, phone, password, username: result.Id,
          },
        });

        auth0.auth
          .passwordRealm({
            username: email,
            password,
            realm: 'Username-Password-Authentication',
            scope: 'openid profile email offline_access',
          })
          .then((credentials) => {
            console.log('cred', credentials);
            SecureStore.setItemAsync('idToken', credentials.idToken);
            SecureStore.setItemAsync('accessToken', credentials.accessToken);
            SecureStore.setItemAsync('refreshToken', credentials.refreshToken);
          })
          .catch((error) => {
            console.log(error.json);
            navigation.goBack();
            dispatch({ type: ActionTypes.ERROR, payload: getError(error) });
          })
          .finally(() => {
            dispatch({ type: ActionTypes.RESET_LOADING });
          });
      })
      .catch((error) => {
        console.log(error.json);
        navigation.goBack();
        dispatch({ type: ActionTypes.ERROR, payload: getError(error) });
        dispatch({ type: ActionTypes.RESET_LOADING });
      });
  };
}

export function logInUserAuth0(user, navigation) {
  const { email, password } = user;

  return (dispatch) => {
    dispatch({ type: ActionTypes.LOADING });

    auth0.auth
      .passwordRealm({
        username: email,
        password,
        realm: 'Username-Password-Authentication',
        scope: 'openid profile email offline_access',
      })
      .then((credentials) => {
        console.log('cred', credentials);
        SecureStore.setItemAsync('idToken', credentials.idToken);
        SecureStore.setItemAsync('accessToken', credentials.accessToken);
        SecureStore.setItemAsync('refreshToken', credentials.refreshToken);

        auth0.auth.userInfo({ token: credentials.accessToken }).then((data) => {
          SecureStore.setItemAsync('id', data.sub);

          SecureStore.getItemAsync('managementToken').then((token) => {
            const options = {
              method: 'GET',
              headers: { authorization: `Bearer ${token}` },
            };
            fetch(`https://dev-recroom.us.auth0.com/api/v2/users/${data.sub}`, options)
              .then((response) => response.json())
              .then((json) => {
                dispatch({ type: ActionTypes.USER_SIGN_IN, payload: json });
                dispatch({ type: ActionTypes.AUTH_USER });
                setTimeout(() => { dispatch({ type: ActionTypes.RESET_LOADING }); }, 500);
              }).catch((error) => {
                console.log(error.json);
                navigation.goBack();
                dispatch({ type: ActionTypes.ERROR, payload: getError(error) });
              });
          });
        });
      })
      .catch((error) => {
        console.log(error.json);
        navigation.goBack();
        dispatch({ type: ActionTypes.ERROR, payload: getError(error) });
      });
  };
}

export function checkIfEmailVerified(callback) {
  SecureStore.getItemAsync('accessToken').then((token) => {
    if (token && token.length > 0) {
      auth0.auth.userInfo({ token }).then((data) => {
        console.log(data);
        if (data.emailVerified) {
          callback();
        }
      }).catch((error) => { console.log(error.json); });
    }
  });
}

export function completeSignUpAuth0() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.LOADING });
    SecureStore.getItemAsync('managementToken').then((token) => {
      SecureStore.getItemAsync('id').then((id) => {
        if (token && token.length > 0) {
          const options = {
            method: 'GET',
            headers: { authorization: `Bearer ${token}` },
          };
          fetch(`https://dev-recroom.us.auth0.com/api/v2/users/${id}`, options)
            .then((response) => response.json())
            .then((json) => {
              const patchOptions = {
                method: 'PATCH',
                headers: {
                  'content-type': 'application/json',
                  authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  user_metadata: {
                    buyer: true,
                  },
                }),
              };
              fetch(`https://dev-recroom.us.auth0.com/api/v2/users/${id}`, patchOptions)
                .then((response) => {
                  console.log(response);
                  dispatch({ type: ActionTypes.USER_SIGN_IN, payload: json });
                  dispatch({ type: ActionTypes.AUTH_USER });
                  dispatch({ type: ActionTypes.RESET_LOADING });
                })
                .catch((error) => { console.log(error); });
            })
            .catch((error) => { console.log(error); });
        }
      });
    });
  };
}

export function tryAuth0OnStart() {
  return (dispatch) => {
    SecureStore.getItemAsync('accessToken').then((accessToken) => {
      auth0.auth.userInfo({ token: accessToken }).then((userInfo) => {
        SecureStore.getItemAsync('managementToken').then((token) => {
          SecureStore.getItemAsync('id').then((id) => {
            if (token && token.length > 0 && id && id.length > 0) {
              const options = {
                method: 'GET',
                headers: { authorization: `Bearer ${token}` },
              };
              fetch(`https://dev-recroom.us.auth0.com/api/v2/users/${id}`, options)
                .then((response) => response.json())
                .then((json) => {
                  console.log(json);
                  dispatch({ type: ActionTypes.USER_SIGN_IN, payload: json });
                  dispatch({ type: ActionTypes.AUTH_USER });
                })
                .catch((error) => { console.log(error); })
                .finally(() => {
                  setTimeout(() => { dispatch({ type: ActionTypes.APP_LOADED }); }, 500);
                });
            }
            dispatch({ type: ActionTypes.APP_LOADED });
          }).catch(() => { dispatch({ type: ActionTypes.APP_LOADED }); });
        }).catch(() => { dispatch({ type: ActionTypes.APP_LOADED }); });

        SecureStore.getItemAsync('refreshToken').then((refreshToken) => {
          const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              grant_type: 'refresh_token',
              client_id: 'UMh55ELLqvogWbyKGrcivBO6TpFm0PEI',
              refresh_token: refreshToken,
            }),
          };

          fetch('https://dev-recroom.us.auth0.com/oauth/token', options)
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
              SecureStore.setItemAsync('accessToken', json.access_token);
            })
            .finally(() => { dispatch({ type: ActionTypes.APP_LOADED }); });
        });
      }).catch(() => { dispatch({ type: ActionTypes.APP_LOADED }); });
    }).catch(() => { dispatch({ type: ActionTypes.APP_LOADED }); });
  };
}

export function signUpWithFacebookAuth0(navigation) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.LOADING });
    auth0
      .webAuth
      .authorize({ scope: 'openid profile email offline_access', connection: 'facebook' })
      .then((credentials) => {
        console.log('cred', credentials);
        SecureStore.setItemAsync('idToken', credentials.idToken);
        SecureStore.setItemAsync('accessToken', credentials.accessToken);
        SecureStore.setItemAsync('refreshToken', credentials.refreshToken);

        auth0.auth.userInfo({ token: credentials.accessToken }).then((data) => {
          SecureStore.setItemAsync('id', data.sub);
          SecureStore.getItemAsync('managementToken').then((token) => {
            const options = {
              method: 'GET',
              headers: { authorization: `Bearer ${token}` },
            };

            fetch(`https://dev-recroom.us.auth0.com/api/v2/users/${data.sub}`, options)
              .then((response) => response.json())
              .then((json) => {
                console.log(json);
                if (json.user_metadata && json.user_metadata.buyer) {
                  console.log('json', json);
                  dispatch({ type: ActionTypes.USER_SIGN_IN, payload: json });
                  dispatch({ type: ActionTypes.AUTH_USER });
                }
                setTimeout(() => { dispatch({ type: ActionTypes.RESET_LOADING }); }, 500);
              })
              .catch((error) => { console.log(error); });
          }).catch((error) => { console.log(error.json); });
        });
      })
      .catch((error) => {
        console.log(error.json);
        navigation.goBack();
        dispatch({ type: ActionTypes.RESET_LOADING });
        dispatch({ type: ActionTypes.ERROR, payload: getError(error) });
      });
  };
}

export function signOut() {
  console.log('sign out');

  return (dispatch) => {
    SecureStore.deleteItemAsync('id');
    SecureStore.deleteItemAsync('accessToken');
    SecureStore.deleteItemAsync('idToken');
    SecureStore.deleteItemAsync('refreshToken');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    dispatch({ type: ActionTypes.APP_LOADED });
  };
}
