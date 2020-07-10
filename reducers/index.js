import { combineReducers } from 'redux';

import LifecycleReducer from './lifecycle-reducer';
import UserReducer from './user-reducer';
import AuthReducer from './auth-reducer';
import SearchReducer from './search-reducer';
import PostReducer from './post-reducer';
import FriendReducer from './friend-reducer';
import RecReducer from './rec-reducer';

const rootReducer = combineReducers({
  lifecycle: LifecycleReducer,
  user: UserReducer,
  auth: AuthReducer,
  search: SearchReducer,
  post: PostReducer,
  friends: FriendReducer,
  rec: RecReducer,
});

export default rootReducer;
