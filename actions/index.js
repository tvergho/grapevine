/* eslint-disable import/no-cycle */
const authActions = {
  AUTH_USER: 'AUTH_USER',
  SET_SIGNUP_STEP: 'SET_SIGNUP_STEP',
  SET_SIGNUP: 'SET_SIGNUP',
  USER_SIGN_IN: 'USER_SIGN_IN',
  CLEAR_USER: 'CLEAR_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  SET_VERIFICATION_ID: 'SET_VERIFICATION_ID',
  SET_VERIFICATION_ERROR: 'SET_VERIFICATION_ERROR',
};

const lifecycleActions = {
  ERROR: 'ERROR',
  RESET_ERROR: 'RESET_ERROR',
  APP_LOADED: 'APP_LOADED',
  LOADING: 'LOADING',
  RESET_LOADING: 'RESET_LOADING',
  CLEAR_ALL: 'CLEAR_ALL',
};

const searchActions = {
  SET_SEARCH: 'SET_SEARCH',
  SEARCH_ERROR: 'SEARCH_ERROR',
  UPDATE_SEARCH: 'UPDATE_SEARCH',
  CAN_LOAD_SEARCH: 'CAN_LOAD_SEARCH',
  SEARCH_LOADING: 'SEARCH_LOADING',
};

const postActions = {
  POST_LOADING: 'POST_LOADING',
  POST_LOADING_STOP: 'POST_LOADING_STOP',
};

const friendActions = {
  SET_FRIENDS: 'SET_FRIENDS',
  SET_REQUESTS: 'SET_REQUESTS',
  FRIENDS_LOADING: 'FRIENDS_LOADING',
  REQUESTS_LOADING: 'REQUESTS_LOADING',
  DELETE_FRIEND: 'DELETE_FRIEND',
};

const recActions = {
  RECS_LOADING: 'RECS_LOADING',
  SET_MY_RECS: 'SET_MY_RECS',
  DELETE_MY_RECS: 'DELETE_MY_RECS',
  SET_RECS: 'SET_RECS',
  SET_ACCEPTED_RECS: 'SET_ACCEPTED_RECS',
  ACCEPT_REC: 'ACCEPT_REC',
  SET_BUSINESS: 'SET_BUSINESS',
  CLEAR_BUSINESS: 'CLEAR_BUSINESS',
  BUSINESS_LOADING: 'BUSINESS_LOADING',
};

const paymentActions = {
  SET_PAYMENT_LOADING: 'SET_PAYMENT_LOADING',
  SET_ACCOUNTS: 'SET_ACCOUNTS',
};

export const ActionTypes = {
  ...authActions,
  ...lifecycleActions,
  ...searchActions,
  ...postActions,
  ...friendActions,
  ...recActions,
  ...paymentActions,
};

export * from './auth-actions';
export * from './lifecycle-actions';
export * from './search-actions';
export * from './post-actions';
export * from './friend-actions';
export * from './rec-actions';
export * from './payment-actions';
