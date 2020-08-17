import { ActionTypes } from '../actions';

const initialState = {
  userId: '',
  firstName: '',
  profilePic: '',
  phone: '',
  balance: 0,
  paymentLoading: true,
  accounts: [],
  paymentLinkToken: '',
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
  case ActionTypes.SET_LINK_TOKEN:
    return { ...state, paymentLinkToken: action.payload };
  case ActionTypes.DELETE_ACCOUNT: {
    const newAccounts = [];
    const accountId = action.payload;
    for (const account of state.accounts) {
      if (account.accountId !== accountId) {
        console.log('add', account.accountId, accountId);
        newAccounts.push(account);
      }
    }
    return { ...state, accounts: newAccounts };
  }
  default:
    return state;
  }
};

export default UserReducer;
