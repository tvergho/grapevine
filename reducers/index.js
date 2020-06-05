import { combineReducers } from 'redux';

import LifecycleReducer from './lifecycle-reducer';

const rootReducer = combineReducers({
  lifecycle: LifecycleReducer,
});

export default rootReducer;
