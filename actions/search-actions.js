/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
import { ActionTypes } from 'actions';

const API_URL = 'https://03q30dqfqi.execute-api.us-east-2.amazonaws.com/dev';

export function setCanLoad(canLoad) {
  return { type: ActionTypes.CAN_LOAD_SEARCH, payload: canLoad };
}

export function businessLocationSearch(lat, long) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SEARCH_LOADING, payload: true });

    fetch(`${API_URL}/business?lat=${lat}&long=${long}`, { method: 'GET' })
      .then((response) => response.json())
      .then((json) => {
        if (json.searchResult.length > 0) {
          dispatch({
            type: ActionTypes.SET_SEARCH,
            payload: {
              scrollId: json._scroll_id,
              searchResults: json.searchResult,
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

      fetch(`${API_URL}/business?scroll_id=${scrollId}`, { method: 'GET' })
        .then((response) => response.json())
        .then((json) => {
          if (json.searchResult.length > 0) {
            dispatch({
              type: ActionTypes.UPDATE_SEARCH,
              payload: {
                scrollId: json._scroll_id,
                searchResults: json.searchResult,
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
