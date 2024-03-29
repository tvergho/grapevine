import { ActionTypes } from '../actions';

const initialState = {
  userId: '',
  firstName: '',
  lastName: '',
  email: '',
  username: '',
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
    let photoURL = '';
    if (user.photoURL) photoURL = user.photoURL.includes('ui-avatars') ? user.photoURL : `${user.photoURL}?random=${Math.random()}`;
    else if (user.picture) photoURL = user.picture.includes('ui-avatars') ? user.picture : `${user.picture}?random=${Math.random()}`;

    return {
      ...state,
      userId: user.uid || user.userId || state.userId,
      firstName: user.displayName || user.firstName || user.first_name || state.firstName,
      lastName: user.lastName || user.last_name || state.lastName,
      email: user.email || state.email,
      username: user.username || state.username,
      profilePic: photoURL || state.profilePic,
      phone: user.phone || state.phone,
      balance: user.balance || state.balance,
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
