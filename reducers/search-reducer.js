/* eslint-disable import/no-cycle */
import { ActionTypes } from 'actions';

export const SearchTypes = {
  BUSINESS_LOC: 'BUSINESS_LOC',
  BUSINESS_NAME: 'BUSINESS_NAME',
  BUSINESS_ALL: 'BUSINESS_ALL',
  USERNAME: 'USERNAME',
  FB_FRIENDS: 'FB_FRIENDS',
  GLOBAL_FEED: 'GLOBAL_FEED',
};

const initialState = {
  businessLoc: {
    scrollId: '',
    searchResults: [],
  },
  businessName: {
    searchResults: [],
  },
  businessAll: {
    searchResults: [],
  },
  fbFriends: {
    searchResults: [],
  },
  username: {
    searchResults: [],
  },
  globalFeed: {
    scrollId: '',
    searchResults: [],
  },
  error: '',
  canLoad: true,
  loading: true,
};

const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.SET_SEARCH: {
    const { scrollId, searchResults, type } = action.payload;

    switch (type) {
    case SearchTypes.BUSINESS_LOC:
      return {
        ...state,
        businessLoc: {
          scrollId,
          searchResults,
        },
      };
    case SearchTypes.BUSINESS_NAME:
      console.log('clear', searchResults);
      return {
        ...state,
        businessName: {
          searchResults,
        },
      };
    case SearchTypes.BUSINESS_ALL:
      return {
        ...state,
        businessAll: {
          searchResults,
        },
      };
    case SearchTypes.USERNAME:
      return {
        ...state,
        username: {
          searchResults,
        },
      };
    case SearchTypes.FB_FRIENDS:
      return {
        ...state,
        fbFriends: {
          searchResults,
        },
      };
    case SearchTypes.GLOBAL_FEED:
      return {
        ...state,
        globalFeed: {
          scrollId,
          searchResults,
        },
      };
    case ActionTypes.CLEAR_ALL:
      return { ...initialState };
    default:
      return {
        ...state,
      };
    }
  }
  case ActionTypes.UPDATE_SEARCH: {
    const { scrollId, searchResults, type } = action.payload;

    switch (type) {
    case SearchTypes.BUSINESS_LOC:
      return {
        ...state,
        businessLoc: {
          scrollId,
          searchResults: state.businessLoc.searchResults.concat(searchResults),
        },
      };
    case SearchTypes.GLOBAL_FEED:
      return {
        ...state,
        globalFeed: {
          scrollId,
          searchResults: state.globalFeed.searchResults.concat(searchResults),
        },
      };
    default:
      return {
        ...state,
      };
    }
  }
  case ActionTypes.SEARCH_ERROR:
    if (action.payload) return { ...state, error: action.payload };
    else return { ...state, error: '' };
  case ActionTypes.CAN_LOAD_SEARCH:
    return { ...state, canLoad: action.payload };
  case ActionTypes.SEARCH_LOADING:
    return { ...state, loading: action.payload };
  default:
    return state;
  }
};

export default SearchReducer;
