import { ActionTypes } from '../actions';

const initialState = {
  userId: '',
  firstName: '',
  profilePic: '',
  balance: 0,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.USER_SIGN_IN: {
    const user = action.payload;
    return {
      ...state,
      userId: user.uid || state.userId,
      firstName: user.displayName || state.firstName,
      profilePic: user.photoURL || state.profilePic,
    };
  }
  case ActionTypes.CLEAR_USER:
    return initialState;
  default:
    return state;
  }
};

export default UserReducer;
