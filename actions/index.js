/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import { Platform } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
// import * as SecureStore from 'expo-secure-store';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import * as AuthSession from 'expo-auth-session';
import awsConfig from '../aws-exports';

const cognitoIdp = new AWS.CognitoIdentityServiceProvider({ region: 'us-east-2' });
const RCTNetworking = require('react-native/Libraries/Network/RCTNetworking');
// const Crypto = require('crypto');

/*
const expoUrlOpener = async (url, redirectUrl) => {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(url, redirectUrl);
  console.log(url);
  console.log(newUrl);

  if (type === 'success') {
    await WebBrowser.dismissBrowser();
    if (!newUrl.includes('Already+found')) {
      if (Platform.OS === 'ios') {
        console.log(newUrl);
        return Linking.openURL(newUrl);
      }
    } else {
      Auth.federatedSignIn({ provider: 'Facebook' });
    }
  }
}; */
/*
const expoUrlOpener = async (url, redirectUrl) => {
  const { type, params, event } = await AuthSession.startAsync({ authUrl: url, returnUrl: redirectUrl });

  if (type === 'success') {
    console.log(params);
    console.log(event);

    await AuthSession.dismiss();
    if (Platform.OS === 'ios') {
      if (params.code && params.state) {
        return Linking.openURL(`${redirectUrl}?code=${params.code}&state=${params.state}`);
      } else {
        Auth.federatedSignIn({ provider: 'Facebook' });
      }
    }
  }
}; */

Linking.addEventListener('url', (event) => {
  console.log(event.url);
  if (event.url.includes('Already+found+an+entry')) {
    WebBrowser.dismissBrowser();
    RCTNetworking.clearCookies(() => { });
    WebBrowser.openBrowserAsync(''.concat(
      'https://recroom3b6eacb3-3b6eacb3-dev.auth.us-east-2.amazoncognito.com/oauth2/authorize?response_type=code',
      '&client_id=62acph13377l9mg9eqhn9kic8n',
      '&identity_provider=Facebook',
      `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
      '&scope=phone+email+openid+profile+aws.cognito.signin.user.admin',
    ));
  } else if (event.url.includes('code')) {
    WebBrowser.dismissBrowser();
    RCTNetworking.clearCookies(() => { });
  }
});

const expoUrlOpener = async (url, redirectUrl) => {
  console.log(url);
  console.log(redirectUrl);
  WebBrowser.openBrowserAsync(url);
};

const amplifyConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    // urlOpener: expoUrlOpener,
  },
};
const expoScheme = 'recroom://';
let redirectUrl = Linking.makeUrl();
if (redirectUrl.startsWith('exp://1')) {
  redirectUrl += '/--/';
} else
if (!(redirectUrl === expoScheme)) {
  redirectUrl += '/';
}

amplifyConfig.oauth.redirectSignIn = redirectUrl;
amplifyConfig.oauth.redirectSignOut = redirectUrl;
// console.log(redirectUrl);
Amplify.configure(amplifyConfig);

const ROOT_URL = 'https://graph.facebook.com';

export const ActionTypes = {
  FONTS_LOADED: 'FONTS_LOADED',
  SIGN_UP_USER: 'SIGN_UP_USER',
  AUTH_USER: 'AUTH_USER',
  FB_SIGN_IN: 'FB_SIGN_IN',
  ERROR: 'ERROR',
  RESET_ERROR: 'RESET_ERROR',
  APP_LOADED: 'APP_LOADED',
  LOADING: 'LOADING',
  RESET_LOADING: 'RESET_LOADING',
  CODE_ERROR: 'CODE_ERROR',
  USER_SIGN_IN: 'USER_SIGN_IN',
};

// Lifecycle
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

// Normal sign in flow
export function signUpUser(user, navigation) {
  const {
    firstName, lastName, email, phone, password, profilePic,
  } = user;
  const name = `${firstName} ${lastName}`;
  const preferredUsername = `${firstName}-${lastName}`;

  return (dispatch) => {
    dispatch({ type: ActionTypes.LOADING });
    Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        phone_number: phone.length > 0 ? `+${phone}` : '',
        name,
        preferred_username: preferredUsername,
        'custom:first_name': firstName,
        'custom:last_name': lastName,
        'custom:profile_pic': profilePic && profilePic.length > 0 ? profilePic : '',
      },
    })
      .then((result) => {
        dispatch({
          type: ActionTypes.SIGN_UP_USER,
          payload: {
            firstName, lastName, email, phone, password, username: result.user.getUsername(),
          },
        });
        dispatch({ type: ActionTypes.RESET_LOADING });
      })
      .catch((error) => {
        console.log(error);
        navigation.goBack();
        dispatch({ type: ActionTypes.ERROR, payload: error.message });
        dispatch({ type: ActionTypes.RESET_LOADING });
      });
  };
}

export function confirmUser(username, code, callback) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.LOADING });
    Auth.confirmSignUp(username, code)
      .then((result) => {
        callback();
        dispatch({ type: ActionTypes.RESET_LOADING });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.CODE_ERROR, payload: true });
        dispatch({ type: ActionTypes.RESET_LOADING });
      });
  };
}

export function getUser() {
  return (dispatch) => {
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then((user) => {
        console.log(user);
        dispatch({ type: ActionTypes.USER_SIGN_IN, payload: user.attributes });
        dispatch({ type: ActionTypes.AUTH_USER });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch({ type: ActionTypes.RESET_LOADING });
      });
  };
}

export function signInUser(email, password) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.LOADING });

    Auth.signIn(email, password)
      .then((result) => {
        dispatch({ type: ActionTypes.AUTH_USER });
        dispatch({ type: ActionTypes.RESET_LOADING });

        Auth.currentAuthenticatedUser({ bypassCache: true })
          .then((user) => { dispatch({ type: ActionTypes.USER_SIGN_IN, payload: user.attributes }); });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR, payload: error.message });
        dispatch({ type: ActionTypes.RESET_LOADING });
      });
  };
}

export function signInOnStart() {
  return (dispatch) => {
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then((user) => {
        console.log(user);
        dispatch({ type: ActionTypes.USER_SIGN_IN, payload: user.attributes });
        dispatch({ type: ActionTypes.AUTH_USER });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch({ type: ActionTypes.APP_LOADED });
      });
  };
}

// Facebook sign in flow

export function signUpWithFacebook(navigation) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.LOADING });
    navigation.navigate('SignUpStep', { fb: true });
    WebBrowser.openBrowserAsync(''.concat(
      'https://recroom3b6eacb3-3b6eacb3-dev.auth.us-east-2.amazoncognito.com/oauth2/authorize?response_type=code',
      '&client_id=62acph13377l9mg9eqhn9kic8n',
      '&identity_provider=Facebook',
      `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
      '&scope=phone+email+openid+profile+aws.cognito.signin.user.admin',
    ));
    // Auth.federatedSignIn({ provider: 'Facebook' });
  };
}

export function getFBUser() {
  return (dispatch) => {
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then((user) => {
        Auth.currentSession().then((session) => {
          dispatch({ type: ActionTypes.USER_SIGN_IN, payload: user.attributes });
          console.log('token', session.getAccessToken());
          console.log('fb token', user.attributes['custom:access_token']);
          cognitoIdp.deleteUser({ AccessToken: session.getAccessToken().getJwtToken() }, (err, data) => {
          // eslint-disable-next-line no-unused-vars
            const [providerName, id] = user.username.split('_');

            Auth.signUp({
              username: user.attributes.email,
              password: 'Testing123$',
              attributes: {
                email: user.attributes.email,
                name: `${user.attributes['custom:first_name']} ${user.attributes['custom:last_name']}`,
                preferred_username: `${user.attributes['custom:first_name']}-${user.attributes['custom:last_name']}`,
                'custom:first_name': user.attributes['custom:first_name'],
                'custom:last_name': user.attributes['custom:last_name'],
                'custom:access_token': user.attributes['custom:access_token'],
                'custom:profile_pic': `${ROOT_URL}/${id}/picture?width=300&height=300`,
                'custom:fb_id': id,
              },
              clientMetadata: {
                fb: 'yes',
              },
            })
              .then((result) => {
                Auth.signIn(user.attributes.email, 'Testing123$')
                  .then((signInResult) => {
                    dispatch({ type: ActionTypes.RESET_LOADING });
                  })
                  .catch((error) => {
                    dispatch({ type: ActionTypes.ERROR, payload: error.message });
                  });
              })
              .catch((error) => {
                if (error.message !== 'An account with the given email already exists.') {
                  dispatch({ type: ActionTypes.ERROR, payload: error.message });
                } else {
                  dispatch(getUser());
                }
              });
          });
        });
      }).catch((error) => {
        dispatch({ type: ActionTypes.ERROR, payload: error.message });
      });
  };
}

export function setPassword(password) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.LOADING });
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then((user) => {
        Auth.changePassword(user, 'Testing123$', password);
        dispatch({ type: ActionTypes.SIGN_UP_USER, payload: { password } });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch({ type: ActionTypes.RESET_LOADING });
      });
  };
}

export function signOut() {
  Auth.signOut();
}

export function testIfUserExists() {
  if (!this.run) {
    this.run = true;

    return (dispatch) => {
      Auth.currentAuthenticatedUser({ bypassCache: true })
        .then((user) => {
          console.log('test', user);
          if (user.attributes.preferred_username && user.attributes.preferred_username.length > 0) {
            dispatch(getUser());
          } else {
            dispatch(getFBUser());
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }
}

export function signUpWithFacebookOld(token, navigation, expires) {
  const fields = 'email,first_name,last_name';

  return (dispatch) => {
    dispatch({ type: ActionTypes.LOADING });
    navigation.navigate('SignUpStep', { fb: true });
    // SecureStore.setItemAsync('fbtoken', token);

    fetch(`${ROOT_URL}/me?fields=${fields}&access_token=${token}`).then((result) => {
      result.json().then((fieldResult) => {
        if (!fieldResult.error) {
          const { email } = fieldResult;
          Auth.federatedSignIn('facebook', { token, expires_at: expires }, { name: email });
        }
      });
    });
  };
}

/*
export function signUpWithFacebookOld(token, navigation) {
  const fields = 'email,first_name,last_name';

  return (dispatch) => {
    dispatch({ type: ActionTypes.LOADING });
    navigation.navigate('SignUpStep', { fb: true });
    // SecureStore.setItemAsync('fbtoken', token);

    fetch(`${ROOT_URL}/me?fields=${fields}&access_token=${token}`).then((result) => {
      result.json().then((fieldResult) => {
        if (!fieldResult.error) {
          Auth.signUp({
            username: fieldResult.email,
            password: 'Testing123$',
          }).then((signUpResult) => {
            console.log('success', signUpResult);
            // Check for whether it's a user account already exists error.
            // If no error, set the password and other attributes.
            // Otherwise, sign back up with the Facebook token.
          }).catch((error) => {
            console.log('error', error);
            if (error.message === 'An account with the given email already exists.') {
              const password = Crypto.randomBytes(16).toString('hex').slice(0, 16);
              Auth.signUp({
                username: fieldResult.email,
                password,
                attributes: {
                  email: fieldResult.email,
                  'custom:access_token': token,
                  'custom:profile_pic': `${ROOT_URL}/${fieldResult.id}/picture?width=300&height=300`,
                  'custom:fb_id': fieldResult.id,
                },
                clientMetadata: {
                  fb: 'yes',
                },
              }).then(() => {
                Auth.signIn(fieldResult.email, password)
                  .then((signInResult) => {
                    dispatch(getUser());
                  })
                  .catch((signInError) => {
                    dispatch({ type: ActionTypes.ERROR, payload: signInError.message });
                  });
              });
            } else {
              dispatch({ type: ActionTypes.ERROR, payload: error.message });
            }
          });
        }
      });
    });
  };
} */
