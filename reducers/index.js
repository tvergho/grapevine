import { combineReducers } from 'redux';

import LifecycleReducer from './lifecycle-reducer';
import UserReducer from './user-reducer';
import AuthReducer from './auth-reducer';
import SearchReducer from './search-reducer';
import PostReducer from './post-reducer';

const rootReducer = combineReducers({
  lifecycle: LifecycleReducer,
  user: UserReducer,
  auth: AuthReducer,
  search: SearchReducer,
  post: PostReducer,
});

export default rootReducer;
