import { ActionTypes } from '../actions';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  balance: 0,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.SIGN_UP_USER:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default UserReducer;
