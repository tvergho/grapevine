import { combineReducers } from 'redux';

import LifecycleReducer from './lifecycle-reducer';
import UserReducer from './user-reducer';
import AuthReducer from './auth-reducer';

const rootReducer = combineReducers({
  lifecycle: LifecycleReducer,
  user: UserReducer,
  auth: AuthReducer,
});

export default rootReducer;
