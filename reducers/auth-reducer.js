import { ActionTypes } from '../actions';

const initialState = {
  authenticated: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.AUTH_USER:
    return { ...state, authenticated: true };
  case ActionTypes.DEAUTH_USER:
    return { ...state, authenticated: false };
  default:
    return state;
  }
};

export default AuthReducer;
