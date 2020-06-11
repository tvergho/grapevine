import { ActionTypes } from '../actions';

const initialState = {
  fontsLoaded: false,
  appLoaded: false,
  errorMessage: '',
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
  default:
    return state;
  }
};

export default LifecycleReducer;
