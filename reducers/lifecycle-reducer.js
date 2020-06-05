import { ActionTypes } from '../actions';

const initialState = {
  fontsLoaded: false,
};

const LifecycleReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.FONTS_LOADED:
    return { ...state, fontsLoaded: true };
  default:
    return state;
  }
};

export default LifecycleReducer;
