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

    newUser.profilePic = attributes.picture;
    newUser.firstName = attributes.givenName;

    if (attributes.picture.includes('gravatar.com')) { // Fixes bug where image isn't refreshed right away.
      const imageURL = `https://ui-avatars.com/api/?name=${attributes.givenName}+${attributes.familyName}&size=300&bold=true&background=FFB7B2&color=FFFFFF`;
      newUser.profilePic = imageURL;
    }

    console.log('newuser', newUser);
    return newUser;
  }
  default:
    return state;
  }
};

export default UserReducer;
