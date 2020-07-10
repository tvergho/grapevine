/* eslint-disable import/no-cycle */
export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  ERROR: 'ERROR',
  RESET_ERROR: 'RESET_ERROR',
  APP_LOADED: 'APP_LOADED',
  LOADING: 'LOADING',
  RESET_LOADING: 'RESET_LOADING',
  USER_SIGN_IN: 'USER_SIGN_IN',
  DEAUTH_USER: 'DEAUTH_USER',
  SET_SEARCH: 'SET_SEARCH',
  SEARCH_ERROR: 'SEARCH_ERROR',
  UPDATE_SEARCH: 'UPDATE_SEARCH',
  CAN_LOAD_SEARCH: 'CAN_LOAD_SEARCH',
  SEARCH_LOADING: 'SEARCH_LOADING',
  POST_LOADING: 'POST_LOADING',
  POST_LOADING_STOP: 'POST_LOADING_STOP',
  SET_FRIENDS: 'SET_FRIENDS',
  SET_REQUESTS: 'SET_REQUESTS',
  FRIENDS_LOADING: 'FRIENDS_LOADING',
  REQUESTS_LOADING: 'REQUESTS_LOADING',
  DELETE_FRIEND: 'DELETE_FRIEND',
  RECS_LOADING: 'RECS_LOADING',
  SET_MY_RECS: 'SET_MY_RECS',
  DELETE_MY_RECS: 'DELETE_MY_RECS',
  SET_RECS: 'SET_RECS',
};

export * from './auth-actions';
export * from './lifecycle-actions';
export * from './search-actions';
export * from './post-actions';
export * from './friend-actions';
export * from './rec-actions';
