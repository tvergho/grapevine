import { ActionTypes } from 'actions';

const initialState = {
  requestsLoading: true,
  friendsLoading: true,
  friends: [],
  requests: [],
};

const FriendReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.FRIENDS_LOADING:
    return {
      ...state,
      friendsLoading: action.payload,
    };
  case ActionTypes.REQUESTS_LOADING:
    return {
      ...state,
      requestsLoading: action.payload,
    };
  case ActionTypes.SET_FRIENDS:
    return {
      ...state,
      friends: action.payload,
    };
  case ActionTypes.SET_REQUESTS:
    return {
      ...state,
      requests: action.payload,
    };
  case ActionTypes.DELETE_FRIEND: {
    const updatedFriends = [];
    for (const friend of state.friends) {
      if (friend.UserID !== action.payload) {
        updatedFriends.push(friend);
      }
    }
    return {
      ...state,
      friends: updatedFriends,
    };
  }
  default:
    return state;
  }
};

export default FriendReducer;
