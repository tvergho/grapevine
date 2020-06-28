import { combineReducers } from 'redux';

import LifecycleReducer from './lifecycle-reducer';
import UserReducer from './user-reducer';
import AuthReducer from './auth-reducer';
import SearchReducer from './search-reducer';

const rootReducer = combineReducers({
  lifecycle: LifecycleReducer,
  user: UserReducer,
  auth: AuthReducer,
  search: SearchReducer,
});

export default rootReducer;
