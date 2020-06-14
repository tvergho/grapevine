import { ActionTypes } from '../actions';

const initialState = {
  fontsLoaded: false,
  appLoaded: false,
  loading: false,
  errorMessage: '',
  codeError: false,
};

const LifecycleReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.FONTS_LOADED:
    return { ...state, fontsLoaded: true };
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
  case ActionTypes.CODE_ERROR:
    return { ...state, codeError: action.payload };
  default:
    return state;
  }
};

export default LifecycleReducer;
