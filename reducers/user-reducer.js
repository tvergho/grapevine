import { ActionTypes } from '../actions';

const initialState = {
  userId: '',
  firstName: '',
  profilePic: '',
  phone: '',
  balance: 0,
  paymentLoading: true,
  accounts: [],
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
      phone: user.phone || state.phone,
    };
  }
  case ActionTypes.CLEAR_USER:
    return initialState;
  case ActionTypes.SET_PAYMENT_LOADING:
    return { ...state, paymentLoading: action.payload };
  case ActionTypes.SET_ACCOUNTS:
    return { ...state, accounts: action.payload };
  default:
    return state;
  }
};

export default UserReducer;
