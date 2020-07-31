import { ActionTypes } from '../actions';

const initialState = {
  appLoaded: false,
  loading: false,
  errorMessage: '',
  codeError: false,
  signUpStep: '',
};

const LifecycleReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.APP_LOADED:
    return { ...state, appLoaded: true };
  case ActionTypes.ERROR:
    return { ...state, errorMessage: action.payload };
  case ActionTypes.RESET_ERROR:
    return { ...state, errorMessage: '' };
  case ActionTypes.LOADING:
    return { ...state, loading: true };
  case ActionTypes.RESET_LOADING:
    return { ...state, loading: false };
  case ActionTypes.SET_SIGNUP_STEP:
    return { ...state, signUpStep: action.payload };
  default:
    return state;
  }
};

export default LifecycleReducer;
