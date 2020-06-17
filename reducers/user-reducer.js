import { ActionTypes } from '../actions';

const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  phone: '',
  profilePic: '',
  fbID: '',
  fbToken: '',
  balance: 0,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.SIGN_UP_USER:
    return { ...state, ...action.payload };
  case ActionTypes.USER_SIGN_IN: {
    console.log('action', action.payload);
    const newUser = { ...state };
    const attributes = action.payload;

    newUser.profilePic = attributes.picture_large ? attributes.picture_large : attributes.picture;
    newUser.firstName = attributes.user_metadata ? attributes.user_metadata.firstName : '';
    if (attributes.given_name) {
      newUser.firstName = attributes.given_name;
    }

    return newUser;
  }
  default:
    return state;
  }
};

export default UserReducer;
