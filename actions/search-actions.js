/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
import { ActionTypes } from 'actions';
import { SearchTypes } from 'reducers/search-reducer';
import auth from '@react-native-firebase/auth';
import { AccessToken } from 'react-native-fbsdk';
import { stripPhone } from 'utils/formatPhone';

const API_URL = 'https://api.bobame.app';

export function setCanLoad(canLoad) {
  return { type: ActionTypes.CAN_LOAD_SEARCH, payload: canLoad };
}

export function setSearchLoad(load) {
  return { type: ActionTypes.SEARCH_LOADING, payload: load };
}

export function clearNameSearch() {
  return {
    type: ActionTypes.SET_SEARCH,
    payload: {
      searchResults: [],
      type: SearchTypes.BUSINESS_NAME,
    },
  };
}

export function clearUsernameSearch() {
  return {
    type: ActionTypes.SET_SEARCH,
    payload: {
      searchResults: [],
      type: SearchTypes.USERNAME,
    },
  };
}

export function getGlobalFeed() {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.SEARCH_LOADING, payload: true });

    const token = await auth().currentUser.getIdToken();
    fetch(`${API_URL}/recommendation/feed`, { method: 'GET', headers: { Authorization: token } })
      .then((response) => response.json())
      .then((json) => {
        const { searchResult, _scroll_id } = json;

        if (searchResult.length > 0) {
          dispatch({
            type: ActionTypes.SET_SEARCH,
            payload: {
              scrollId: _scroll_id,
              searchResults: searchResult,
              type: SearchTypes.GLOBAL_FEED,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.SEARCH_ERROR, payload: error.message });
      })
      .finally(() => {
        dispatch({ type: ActionTypes.SEARCH_LOADING, payload: false });
      });
  };
}

export function globalFeedScroll(scrollId) {
  console.log(scrollId);
  return async (dispatch, getState) => {
    if (getState().search.canLoad) {
      dispatch(setCanLoad(false));

      const token = await auth().currentUser.getIdToken();
      fetch(`${API_URL}/recommendation/feed?scroll_id=${scrollId}`, { method: 'GET', headers: { Authorization: token } })
        .then((response) => response.json())
        .then((json) => {
          const { searchResult, _scroll_id } = json;

          if (searchResult.length > 0) {
            dispatch({
              type: ActionTypes.UPDATE_SEARCH,
              payload: {
                scrollId: _scroll_id,
                searchResults: searchResult,
                type: SearchTypes.GLOBAL_FEED,
              },
            });
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch({ type: ActionTypes.SEARCH_ERROR, payload: error.message });
        })
        .finally(() => {
          dispatch({ type: ActionTypes.SEARCH_LOADING, payload: false });
        });
    }
  };
}

export function businessLocationSearch(lat, long) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SEARCH_LOADING, payload: true });

    fetch(`${API_URL}/business/location?lat=${lat}&long=${long}`, { method: 'GET' })
      .then((response) => response.json())
      .then((json) => {
        if (json.searchResult.length > 0) {
          dispatch({
            type: ActionTypes.SET_SEARCH,
            payload: {
              scrollId: json._scroll_id,
              searchResults: json.searchResult,
              type: SearchTypes.BUSINESS_LOC,
            },
          });
        } else {
          dispatch({ type: ActionTypes.SEARCH_ERROR, payload: 'No BobaMe locations were found near you.' });
        }
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.SEARCH_ERROR, payload: error.message });
      })
      .finally(() => {
        dispatch({ type: ActionTypes.SEARCH_LOADING, payload: false });
      });
  };
}

export function businessLocationScroll(lat, long, scrollId) {
  return (dispatch, getState) => {
    if (getState().search.canLoad) {
      dispatch(setCanLoad(false));

      fetch(`${API_URL}/business/location?scroll_id=${scrollId}`, { method: 'GET' })
        .then((response) => response.json())
        .then((json) => {
          if (json.searchResult.length > 0) {
            dispatch({
              type: ActionTypes.UPDATE_SEARCH,
              payload: {
                scrollId: json._scroll_id,
                searchResults: json.searchResult,
                type: SearchTypes.BUSINESS_LOC,
              },
            });
          }
        })
        .catch((error) => {
          dispatch(businessLocationSearch(lat, long));
        });
    }
  };
}

export function businessNameSearch(name, lat, long) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SEARCH_LOADING, payload: true });

    fetch(lat && long ? `${API_URL}/business/name?name=${name.trim().toLowerCase()}&lat=${lat}&long=${long}` : `${API_URL}/business/name?name=${name.trim().toLowerCase()}`, { method: 'GET' })
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: ActionTypes.SET_SEARCH,
          payload: {
            searchResults: json.searchResult,
            type: SearchTypes.BUSINESS_NAME,
          },
        });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.SEARCH_ERROR, payload: error.message });
      })
      .finally(() => {
        dispatch({ type: ActionTypes.SEARCH_LOADING, payload: false });
      });
  };
}

export function allBusinessSearch(lat, long) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SEARCH_LOADING, payload: true });

    fetch(lat && long ? `${API_URL}/business?lat=${lat}&long=${long}` : `${API_URL}/business`, { method: 'GET' })
      .then((response) => response.json())
      .then((json) => {
        if (json.searchResult.length > 0) {
          dispatch({
            type: ActionTypes.SET_SEARCH,
            payload: {
              searchResults: json.searchResult,
              type: SearchTypes.BUSINESS_ALL,
            },
          });
        }
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.SEARCH_ERROR, payload: error.message });
      })
      .finally(() => {
        dispatch({ type: ActionTypes.SEARCH_LOADING, payload: false });
      });
  };
}

export function usernameSearch(username) {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.SEARCH_LOADING, payload: true });
    const token = await auth().currentUser.getIdToken();

    fetch(`${API_URL}/users/username?username=${username.replace('@', '')}`, { method: 'GET', headers: { Authorization: token } })
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: ActionTypes.SET_SEARCH,
          payload: {
            searchResults: json.response,
            type: SearchTypes.USERNAME,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.SEARCH_ERROR, payload: error.message });
      })
      .finally(() => {
        dispatch({ type: ActionTypes.SEARCH_LOADING, payload: false });
      });
  };
}

export function phoneSearch(phone) {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.SEARCH_LOADING, payload: true });
    const token = await auth().currentUser.getIdToken();

    fetch(`${API_URL}/users/phone/search?phone=${stripPhone(phone)}`, { method: 'GET', headers: { Authorization: token } })
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: ActionTypes.SET_SEARCH,
          payload: {
            searchResults: json.response,
            type: SearchTypes.USERNAME,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.SEARCH_ERROR, payload: error.message });
      })
      .finally(() => {
        dispatch({ type: ActionTypes.SEARCH_LOADING, payload: false });
      });
  };
}

export function fbFriendsSearch() {
  return async (dispatch) => {
    const token = await auth().currentUser.getIdToken();
    const { accessToken } = await AccessToken.getCurrentAccessToken();

    fetch(`${API_URL}/users/facebook?fbToken=${accessToken}`, { method: 'GET', headers: { Authorization: token } })
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: ActionTypes.SET_SEARCH,
          payload: {
            searchResults: json.response,
            type: SearchTypes.FB_FRIENDS,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.SEARCH_ERROR, payload: error.message });
      });
  };
}
