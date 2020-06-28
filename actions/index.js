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
};

export * from './auth-actions';
export * from './lifecycle-actions';
export * from './search-actions';
