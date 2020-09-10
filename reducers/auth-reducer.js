import { ActionTypes } from '../actions';

const initialState = {
  authenticated: false,
  verificationId: '',
  verificationError: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.AUTH_USER:
    return { ...state, authenticated: true };
  case ActionTypes.DEAUTH_USER:
    return { ...initialState };
  case ActionTypes.SET_VERIFICATION_ID:
    return { ...state, verificationId: action.payload };
  case ActionTypes.SET_VERIFICATION_ERROR:
    return { ...state, verificationError: action.payload };
  default:
    return state;
  }
};

export default AuthReducer;
