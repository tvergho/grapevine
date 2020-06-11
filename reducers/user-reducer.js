import { ActionTypes } from '../actions';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  profilePic: '',
  fbID: '',
  fbToken: '',
  balance: 0,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.SIGN_UP_USER:
    return { ...state, ...action.payload };
  case ActionTypes.FB_SIGN_IN: {
    const newUser = { ...state };
    const json = action.payload;

    newUser.firstName = json.first_name;
    newUser.lastName = json.last_name;
    newUser.email = json.email;
    newUser.profilePic = json.imageURL;
    newUser.fbID = json.id;
    newUser.fbToken = json.token;

    return newUser;
  }
  default:
    return state;
  }
};

export default UserReducer;
